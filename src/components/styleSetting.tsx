import styled from 'styled-components'
import { useStore } from "../zustant"
import { elementStyle } from "../comps/compValue"
import { compAttribute } from "../comps/compData"
import { useEffect, useState } from 'react';
import Export from './Export';

const StyleSetting = () => {
  const iconProps = { fill: "#363636", width: 18, height: 18, style: { padding: 2, marginLeft: 10, cursor: "pointer" } };
  const { selectedComp }: { selectedComp: HTMLElement } = useStore();
  const [styleList, setStyleList] = useState<string[]>([]);
  const [attributeList, setAttributeList] = useState<string[]>([]);
  const [styleValue, setStyleValue] = useState<any>([]);

  const changeFocus = (target: HTMLElement) => {
    const sizeWrapper3: HTMLElement = document.getElementById("sizeWrapper3") || document.body;
    const sizeWrapper4: HTMLElement = document.getElementById("sizeWrapper4") || document.body;

    const eventComp = target as HTMLElement;
    const targetStyle = eventComp.style;

    const targetWidth = eventComp.clientWidth;
    const targetHeight = eventComp.clientHeight;

    const marginLeft = Number(targetStyle.getPropertyValue("margin-left").split("px")[0]);
    const marginRight = Number(targetStyle.getPropertyValue("margin-right").split("px")[0]);

    const marginTop = Number(targetStyle.getPropertyValue("margin-top").split("px")[0]);
    const marginBottom = Number(targetStyle.getPropertyValue("margin-bottom").split("px")[0]);

    const width = targetWidth + marginLeft + marginRight;
    const height = targetHeight + marginTop + marginBottom;

    sizeWrapper3.style.width = width + "px";
    sizeWrapper3.style.height = height + "px";
    sizeWrapper3.style.boxShadow = "0px 0px 0px 1.5px #0D99FF inset";

    sizeWrapper4.style.width = width + "px";
    sizeWrapper4.style.height = height + "px";
    sizeWrapper4.style.boxShadow = "0px 0px 0px 2.5px #0D99FF";

    const scrolledTopLength = window.pageYOffset;
    const absoluteTop = scrolledTopLength + eventComp.offsetTop - marginTop;
    sizeWrapper3.style.top = absoluteTop + "px";
    sizeWrapper4.style.top = absoluteTop + "px";
  }

  useEffect(() => {
    if (selectedComp !== document.body) {
      const newStyleList: string[] = [];
      Object.keys(elementStyle[selectedComp.tagName.toLowerCase()]).forEach((key) => {
        newStyleList.push(key);
      });
      setStyleList(newStyleList);

      const newAttributeList: string[] = [];
      if (compAttribute[selectedComp.tagName.toLowerCase()]) {
        compAttribute[selectedComp.tagName.toLowerCase()].forEach((att) => {
          newAttributeList.push(att);
        });
        setAttributeList(newAttributeList);
      }
    }
  }, [selectedComp]);

  useEffect(() => {
    styleList.forEach((st) => {
      const stComp: any = document.getElementById(st);
      const style: any = st;
      stComp.value = selectedComp.style[style];
      stComp.addEventListener("focusout", (e: any) => {
        const target: any = document.querySelector(`#${e.target.className}`);
        target.style[style] = e.target.value;
        changeFocus(target);
      });
      stComp.addEventListener("keypress", (e: any) => {
        if (e.key === 'Enter') {
          const target: any = document.querySelector(`#${e.target.className}`);
          const style: any = st;
          target.style[style] = e.target.value;
          changeFocus(target);
        }
      });
    })
  }, [styleList, attributeList])


  return (
    <Container>
      <Name>Style</Name>
      {
        attributeList.map((style, key) => (
          <Style key={key}>{style}</Style>
        ))
      }
      {
        styleList.map((st, key) => {
          const style: any = st;
          return (
            <Style key={key}>
              <h1>{style}</h1>
              <input id={style} className={selectedComp.id} type={"text"} />
            </Style>
          )
        })
      }
      <span style={{ paddingTop: 24 }}></span>
      <Export />
      <span style={{ paddingTop: 8 }}></span>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 280px;
  height: calc(100vh - 36px);
  background-color: white;
  &::-webkit-scrollbar{
    width: 8px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    width: 8px;
    padding: 4px;
    margin: 8px;
    background-color: rgba(54, 54, 54, 0.4);
  }
`
const Name = styled.h1`
  font-size: 13px;
  padding: 18px 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(54, 54, 54, 0.15);
`
const Style = styled.div`
  margin-top: 22px;
  display:flex;
  align-items: center;
  justify-content: space-between;
  h1{
    margin-left: 12px;
    font-size: 12px;
    font-weight: bold;
  }
  input{
    font-size: 12px;
    margin-right: 12px;
    padding:7px 8px;
    width:40%;
    border-radius: 4px;
    background-color: #ededed;
  }
`

export default StyleSetting