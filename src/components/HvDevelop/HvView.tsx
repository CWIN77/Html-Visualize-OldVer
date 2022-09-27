import { useEffect } from 'react';
import styled from 'styled-components';
import { ableInsert, compData, dbClickAble } from '../../addableComps/compData';
import { useStore, changeHvStorage, getSelectComp } from '../../stateManager';
import { useParams } from "react-router-dom";
import { IHvData } from '../../types';

const HvView = ({ hvData }: { hvData: IHvData }) => {
  const hvId = useParams().id || JSON.parse(sessionStorage.getItem("hvId") || JSON.stringify(null));

  let mouseoverComp = document.body;
  let dbClickComp = document.body;

  const getRandomId = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    let id = '';
    for (let i = 0; i < 5; i++) {
      const randomNum = Math.floor(Math.random() * chars.length);
      id += chars.substring(randomNum, randomNum + 1);
    }
    return id;
  }

  const undoEvent = (e: KeyboardEvent) => {
    if (e.key === 'z' && e.ctrlKey) {
      const compHistory: string[] = JSON.parse(sessionStorage.getItem(hvId + "hstry") || JSON.stringify([]));
      const undoHistory: string[] = JSON.parse(sessionStorage.getItem(hvId + "undo") || JSON.stringify([]));
      if (compHistory.length > 1) {
        const viewElem = document.getElementById('view') as HTMLElement;
        const viewParentElem = viewElem.parentElement as HTMLElement;
        viewElem.remove();
        sessionStorage.setItem(hvId + "undo", JSON.stringify([...undoHistory, compHistory[compHistory.length - 1]]));
        viewParentElem.insertAdjacentHTML('beforeend', compHistory[compHistory.length - 2]);
        compHistory.pop();

        const remakeViewElem = document.getElementById('view') as HTMLElement;
        remakeViewElem.addEventListener("dblclick", textEditEvent);
        remakeViewElem.addEventListener("mouseover", viewMouseoverEvent);
        remakeViewElem.addEventListener("click", viewClickEvent);

        changeHvStorage(hvData, compHistory);
      }
    }
  }
  const redoEvent = (e: KeyboardEvent) => {
    if (e.key === 'Z' && e.ctrlKey && e.shiftKey) {
      const compHistory: string[] = JSON.parse(sessionStorage.getItem(hvId + "hstry") || JSON.stringify([]));
      const undoHistory: string[] = JSON.parse(sessionStorage.getItem(hvId + "undo") || JSON.stringify([]));
      if (undoHistory.length > 0) {
        const viewElem = document.getElementById('view') as HTMLElement;
        const viewParentElem = viewElem.parentElement as HTMLElement;
        viewElem.remove();
        viewParentElem.insertAdjacentHTML('beforeend', undoHistory[undoHistory.length - 1]);
        changeHvStorage(hvData, [...compHistory, undoHistory[undoHistory.length - 1]]);
        undoHistory.pop();
        sessionStorage.setItem(hvId + "undo", JSON.stringify(undoHistory));

        const remakeViewElem = document.getElementById('view') as HTMLElement;
        remakeViewElem.addEventListener("dblclick", textEditEvent);
        remakeViewElem.addEventListener("mouseover", viewMouseoverEvent);
        remakeViewElem.addEventListener("click", viewClickEvent);
      }
    }
  }
  const changeHvEvent = () => {
    changeHvStorage(hvData);
    dbClickComp.contentEditable = "false";
    dbClickComp = document.body;
  }
  const textEditEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    if (dbClickAble.indexOf(tagName) > -1) {
      target.style.boxShadow = "";
      target.contentEditable = "true";
      dbClickComp = target;
      target.addEventListener("focusout", changeHvEvent);
    }
  }
  const copyEvent = (e: KeyboardEvent) => {
    const selectComp = getSelectComp(hvId)
    if (e.key === 'c' && e.ctrlKey && selectComp.className !== document.getElementById("view")?.className) {
      sessionStorage.setItem("copyHv", JSON.stringify(selectComp.outerHTML));
    } else if (e.key === 'v' && e.ctrlKey) {
      const copyComp = JSON.parse(sessionStorage.getItem("copyHv") || JSON.stringify(null));
      if (copyComp) {
        const createElement: HTMLElement = document.createElement("div");
        createElement.insertAdjacentHTML('beforeend', copyComp);
        const newCopyComp = createElement.children[0] as HTMLElement;
        if (ableInsert.indexOf(selectComp.tagName.toLowerCase()) > -1) window.alert("선택한 Html에는 Element를 복사할 수 없습니다.")
        else {
          const cloneComp = newCopyComp.cloneNode(true) as HTMLElement;
          const searchToChangeId = (comp: HTMLElement) => {
            if (comp.nodeType !== 3) {
              const compId = compData.find(i => i.tag === comp.tagName.toLowerCase())?.id || 0;
              comp.className = `hv${compId}${getRandomId()}`;
              comp.style.boxShadow = "";
              if (cloneComp.childNodes.length > 0) {
                comp.childNodes.forEach((cNode) => {
                  searchToChangeId(cNode as HTMLElement);
                });
              }
            }
          }
          searchToChangeId(cloneComp);
          selectComp.append(cloneComp);
          changeHvStorage(hvData);
        }
      }
    }
  }
  const deleteEvent = (e: KeyboardEvent) => {
    const selectComp = getSelectComp(hvId);
    if (dbClickComp === document.body && e.key === "Delete" && selectComp.className && selectComp.id !== "view") {
      selectComp.remove();
      sessionStorage.removeItem(hvId + "selectComp");
      useStore.setState({ isSelectChange: true });
      changeHvStorage(hvData);
    }
  }
  const viewMouseoverEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const selectComp = getSelectComp(hvId);

    if (target !== selectComp && dbClickComp === document.body) {
      if (mouseoverComp && mouseoverComp !== selectComp) {
        mouseoverComp.style.boxShadow = "";
      }
      target.style.boxShadow = "inset 0px 0px 0px 2.5px #8bccfb";
      mouseoverComp = target;
    }
  }
  const viewClickEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const selectComp = getSelectComp(hvId);

    if (target !== dbClickComp) {
      dbClickComp.contentEditable = "false";
      dbClickComp = document.body;
      selectComp.style.boxShadow = "";

      target.style.boxShadow = "inset 0px 0px 0px 2.5px #0D99FF";
      sessionStorage.setItem(hvId + "selectComp", JSON.stringify(target.className));
      useStore.setState({ isSelectChange: true });
    }
  }
  const viewBgClickEvent = (e: MouseEvent) => {
    const selectComp = getSelectComp(hvId);
    if (e.target !== dbClickComp) {
      dbClickComp.contentEditable = "false";
      dbClickComp = document.body;
      mouseoverComp.style.boxShadow = "";
      selectComp.style.boxShadow = "";
      sessionStorage.removeItem(hvId + "selectComp");
      useStore.setState({ isSelectChange: true });
    }
  }
  const viewBgMouseoverEvent = () => {
    const selectComp = getSelectComp(hvId);
    if (mouseoverComp && mouseoverComp !== selectComp) {
      mouseoverComp.style.boxShadow = "";
    }
  }
  const saveEvent = (e: KeyboardEvent) => {
    if (e.key === 's' && e.ctrlKey) {
      alert("HV는 0.5초 마다 변경사항을 자동 저장해줍니다.");
    }
  }
  const stopAnchorEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.nodeName == 'A' && target.id == 'hvAnchor') {
      e.preventDefault();
    }
  }

  useEffect(() => {
    // window.onbeforeunload = () => {
    //   return false;
    // };

    const compHistory: string[] = JSON.parse(sessionStorage.getItem(hvId + "hstry") || JSON.stringify([]));
    if (compHistory.length > 0) {
      const viewElem = document.getElementById('view') as HTMLElement;
      const parentElem = viewElem.parentElement as HTMLElement;
      viewElem.remove();
      parentElem.insertAdjacentHTML('beforeend', compHistory[compHistory.length - 1]);
    } else if (hvData.html) {
      const viewElem = document.getElementById('view') as HTMLElement;
      const parentElem = viewElem.parentElement as HTMLElement;
      viewElem.remove();
      parentElem.insertAdjacentHTML('beforeend', String(hvData.html));
      sessionStorage.setItem(hvId + "hstry", JSON.stringify([hvData.html]));
    }

    const isSetEvent: boolean | null = JSON.parse(sessionStorage.getItem("isSetEvent") || JSON.stringify(null));
    if (!isSetEvent) {
      const bodyElem = document.body;

      bodyElem.addEventListener('keyup', undoEvent);
      bodyElem.addEventListener('keyup', redoEvent);
      bodyElem.addEventListener("keyup", copyEvent);
      bodyElem.addEventListener('keyup', deleteEvent);
      bodyElem.addEventListener('keydown', saveEvent);
      bodyElem.addEventListener('click', stopAnchorEvent);

      sessionStorage.setItem("isSetEvent", JSON.stringify(true));
    }

    const viewElem = document.getElementById('view') as HTMLElement;
    const viewBgElem = document.getElementById('viewBackground') as HTMLElement;

    viewElem.addEventListener("dblclick", textEditEvent);
    viewElem.addEventListener("mouseover", viewMouseoverEvent);
    viewElem.addEventListener("click", viewClickEvent);
    viewBgElem.addEventListener("click", viewBgClickEvent);
    viewBgElem.addEventListener("mouseover", viewBgMouseoverEvent);
  }, [hvData])

  return (
    <ViewContainer id="viewContainer">
      <ViewBox id="viewBox">
        <div className="App" style={{ width: "100%", height: "100%", overflow: "auto", display: "block", backgroundColor: "white" }} id='view' />
      </ViewBox>
      <ViewBackground id="viewBackground" />
    </ViewContainer>
  )
}

const ViewBox = styled.div`
  width:360px;
  height:720px;
  background-color: white;
  position: absolute;
  transform : scale(1, 1);
  border-radius: 8px;
  z-index: 2;
  &::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    background-color: rgba(54,54,54,0.4);
  }
  div{
    &::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: initial;
    }
    &::-webkit-scrollbar-thumb{
      background-color: rgba(54,54,54,0.4);
    }
  }
`
const ViewContainer = styled.div`
  width:calc(100vw - 300px - 340px);
  margin-left: 340px;
  position: fixed;
  height:calc(100vh - 54px);
  display:flex;
  align-items: center;
  justify-content: center;
  overflow:auto;
  background-color: #ededed;
  &::-webkit-scrollbar{
    width:12px;
    height:12px;
    background-color: initial;
    position: absolute;
  }
  &::-webkit-scrollbar-thumb{
    position: absolute;
    background-color: rgba(54,54,54,0.4);
  }
  @media screen and (max-width: 850px) {
    width: 100vw;
    margin-left: 0px;
  }
`
const ViewBackground = styled.span`
  width:calc(100vw - 300px - 340px);
  height:calc(100vh - 54px);
  z-index: 1;

  @media screen and (max-width: 850px) {
    width: 100vw;
  }
`

export default HvView;