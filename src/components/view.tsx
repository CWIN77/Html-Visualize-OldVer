import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ableInsert } from '../comps/compData';
import { useStore } from '../zustant'

const View = () => {
  const { selectedComp }: { selectedComp: HTMLElement } = useStore();
  let mouseoverComp = document.body;
  let clickedComp = selectedComp;
  let copyComp: HTMLElement;
  let dbClickComp = document.body;

  const dbClickEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const tagName = target.tagName.substring(0, 1).toLowerCase();
    if (tagName === "h" || tagName === "a") {
      target.style.boxShadow = "";
      target.contentEditable = "true";
      dbClickComp = target;
    }
  }

  const copyEvent = (e: KeyboardEvent) => {
    if (clickedComp.className === "viewComp" || clickedComp.id === "view") {
      if (e.key === 'c' && e.ctrlKey) {
        copyComp = clickedComp;
      } else if (e.key === 'v' && e.ctrlKey) {
        const cloneComp = copyComp.cloneNode(true) as HTMLElement;
        cloneComp.style.boxShadow = "";
        if (ableInsert.indexOf(clickedComp.tagName.toLowerCase()) > -1) {
          window.alert("선택한 Html에는 Element를 복사할 수 없습니다.")
        } else {
          // if(copyComp)
          clickedComp.append(cloneComp);
        }
      }
    }
  }
  const deleteEvent = (e: KeyboardEvent) => {
    if (e.key === "Delete" && clickedComp.className === "viewComp") {
      clickedComp.remove();
      const viewComp = document.getElementById("view") as HTMLElement;
      useStore.setState({ selectedComp: viewComp });
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
      clickedComp.style.boxShadow = "";
      target.style.boxShadow = "inset 0px 0px 0px 2.5px #0D99FF";
      clickedComp = target;
      useStore.setState({ selectedComp: clickedComp });
    }
  }
  const viewBackgroundClickEvent = (e: MouseEvent) => {
    if (e.target !== dbClickComp) {
      dbClickComp.contentEditable = "false";
      dbClickComp = document.body;
      mouseoverComp.style.boxShadow = "";
      clickedComp.style.boxShadow = "";
      clickedComp = document.body;
    }
  }
  const viewBackgroundMouseoverEvent = () => {
    if (mouseoverComp !== clickedComp) {
      mouseoverComp.style.boxShadow = "";
    }
  }

  useEffect(() => {
    const viewElem = document.getElementById('view') as HTMLElement;
    const bodyElem = document.body;
    const viewBgElem = document.getElementById('viewBackground') as HTMLElement;

    viewElem.addEventListener("dblclick", dbClickEvent)
    bodyElem.addEventListener('keydown', copyEvent);
    bodyElem.addEventListener('keydown', deleteEvent);
    viewElem.addEventListener("mouseover", viewMouseoverEvent);
    viewElem.addEventListener("click", viewClickEvent);
    viewBgElem.addEventListener("click", viewBackgroundClickEvent);
    viewBgElem.addEventListener("mouseover", viewBackgroundMouseoverEvent);
  }, [])

  return (
    <Container id="viewContainer">
      <div style={{ width: "100%", height: "100%", overflow: "auto" }} id='view' />
    </Container>
  )
}

const Container = styled.div`
  width:395px;
  height:720px;
  background-color: white;
  border-radius: 8px;
  z-index: 2;
  &::-webkit-scrollbar{
    width:8px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    width: 8px;
    background-color: rgba(54,54,54,0.4);
    border-radius: 100px;
  }
  div{
    &::-webkit-scrollbar{
    width:8px;
    background-color: initial;
    }
    &::-webkit-scrollbar-thumb{
      width: 8px;
      background-color: rgba(54,54,54,0.4);
      border-radius: 100px;
    }
  }
`

export default View