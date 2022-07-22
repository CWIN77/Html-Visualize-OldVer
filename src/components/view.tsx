import { useEffect } from 'react'
import styled from 'styled-components'
import { ableInsert, dbClickAble } from '../comps/compData';
import { useStore } from '../zustant'

const View = () => {
  const developId = "id";
  const { selectedComp }: { selectedComp: HTMLElement|null } = useStore();
  let mouseoverComp:HTMLElement;
  let clickedComp = selectedComp;
  let copyComp: HTMLElement;
  let dbClickComp:HTMLElement;

  const ctrlZEvent = (e: KeyboardEvent) => {
    if (e.key === 'z' && e.ctrlKey) {
      const sHistory: string = JSON.parse(sessionStorage.getItem(developId) || JSON.stringify([]));
      console.log(sHistory);
    }
  }
  const dbClickEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    if (dbClickAble.indexOf(tagName) > -1) {
      target.style.boxShadow = "";
      target.contentEditable = "true";
      dbClickComp = target;
    }
  }
  const copyEvent = (e: KeyboardEvent) => {
    if (clickedComp !== null && clickedComp.className) {
      if (e.key === 'c' && e.ctrlKey) {
        copyComp = clickedComp;
      } else if (e.key === 'v' && e.ctrlKey) {
        const cloneComp = copyComp.cloneNode(true) as HTMLElement;
        cloneComp.style.boxShadow = "";
        if (ableInsert.indexOf(clickedComp.tagName.toLowerCase()) > -1) {
          window.alert("선택한 Html에는 Element를 복사할 수 없습니다.")
        } else {
          clickedComp.append(cloneComp);
          if (document.getElementById("view")?.outerHTML !== undefined) {
            const sHistory: string[] = JSON.parse(sessionStorage.getItem(developId) || JSON.stringify([]));
            sessionStorage.setItem(developId, JSON.stringify([...sHistory, document.getElementById("view")?.outerHTML as string]));
          }
        }
      }
    }
  }
  const deleteEvent = (e: KeyboardEvent) => {
    if (clickedComp !== null && e.key === "Delete" && clickedComp.className && clickedComp.id !== "view") {
      clickedComp.remove();
      const viewComp = document.getElementById("view") as HTMLElement;
      useStore.setState({ selectedComp: viewComp });
      if (document.getElementById("view")?.outerHTML !== undefined) {
        const sHistory: string[] = JSON.parse(sessionStorage.getItem(developId) || JSON.stringify([]));
        sessionStorage.setItem(developId, JSON.stringify([...sHistory, document.getElementById("view")?.outerHTML as string]));
      }
    }
  }
  const viewMouseoverEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target !== clickedComp) {
      if (mouseoverComp !== clickedComp) {
        mouseoverComp.style.boxShadow = "";
      }
      target.style.boxShadow = "inset 0px 0px 0px 2.5px #8bccfb";
      mouseoverComp = target;
    }
  }
  const viewClickEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target !== dbClickComp) {
      dbClickComp.contentEditable = "false";
      dbClickComp = document.body;
      if(clickedComp !== null) clickedComp.style.boxShadow = "";
      target.style.boxShadow = "inset 0px 0px 0px 2.5px #0D99FF";
      clickedComp = target;
      useStore.setState({ selectedComp: clickedComp });
    }
  }
  const viewBgClickEvent = (e: MouseEvent) => {
    if (e.target !== dbClickComp) {
      dbClickComp.contentEditable = "false";
      dbClickComp = document.body;
      mouseoverComp.style.boxShadow = "";
      if(clickedComp !== null) clickedComp.style.boxShadow = "";
      clickedComp = document.body;
    }
  }
  const viewBgMouseoverEvent = () => {
    if (mouseoverComp !== clickedComp) {
      mouseoverComp.style.boxShadow = "";
    }
  }

  useEffect(() => {
    // window.onbeforeunload = () => {
    //   return false;
    // };
    dbClickComp = document.body;
    mouseoverComp = document.body;
    
    const sHistory: string[] = JSON.parse(sessionStorage.getItem(developId) || JSON.stringify([]));
    if (sHistory.length > 0) {
      const viewElem = document.getElementById('view') as HTMLElement;
      const parentElem = viewElem.parentElement as HTMLElement;
      viewElem.remove();
      parentElem.insertAdjacentHTML('beforeend', sHistory[sHistory.length - 1]);
    }

    const viewElem = document.getElementById('view') as HTMLElement;
    const bodyElem = document.body;
    const viewBgElem = document.getElementById('viewBackground') as HTMLElement;
    bodyElem.addEventListener('keydown', ctrlZEvent);
    viewElem.addEventListener("dblclick", dbClickEvent);
    bodyElem.addEventListener('keydown', copyEvent);
    bodyElem.addEventListener('keydown', deleteEvent);
    viewElem.addEventListener("mouseover", viewMouseoverEvent);
    viewElem.addEventListener("click", viewClickEvent);
    viewBgElem.addEventListener("click", viewBgClickEvent);
    viewBgElem.addEventListener("mouseover", viewBgMouseoverEvent);
  }, [])

  return (
    <ViewContainer id="viewContainer">
      <ViewBox id="viewBox">
        <div className="app" style={{ width: "100%", height: "100%", overflow: "auto", display: "block", backgroundColor: "white" }} id='view' />
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
  width:calc(100vw - 280px - 335px);
  margin-left: 335px;
  position: fixed;
  height:calc(100vh - 46px);
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
`
const ViewBackground = styled.span`
  /* position: fixed; */
  width:calc(100vw - 280px - 335px);
  height:calc(100vh - 46px);
  z-index: 1;
`

export default View