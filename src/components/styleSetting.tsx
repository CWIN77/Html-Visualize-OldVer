import styled from 'styled-components'
import { useStore } from "../zustant"
import { elementStyle } from "../comps/compValue"
import { compAttribute } from "../comps/compData"
import { TAbleStyle } from "../types"
import { useEffect, useState } from 'react';
import Export from './Export';

const StyleSetting = () => {
  const { selectedComp }: { selectedComp: HTMLElement } = useStore();
  const [styleList, setStyleList] = useState<TAbleStyle[]>([]);
  const [attributeList, setAttributeList] = useState<string[]>([]);
  const [isShowDetail, setIsShowDetail] = useState(false);


  useEffect(() => {
    const clickDel = (e: any) => {
      if (e.key === "Delete" && selectedComp !== document.body && selectedComp.id !== "view") {
        selectedComp.remove();
        changeFocus(document.getElementById("view") as HTMLElement);
      }
    }

    selectedComp.addEventListener("keydown", (e) => { clickDel(e); });
  }, [selectedComp])

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

  const changeStyleEventListener = (target: any, style: TAbleStyle) => {
    const styleKey: any = Object.keys(style)[0];
    target.removeEventListener("change", (e: any) => { changeStyle(e, styleKey) });
    target.addEventListener("change", (e: any) => {
      changeStyle(e, styleKey);
    })
  }

  const changeStyle = (e: any, styleKey: any) => {
    selectedComp.style[styleKey] = e.target.value;
    e.target.value = selectedComp.style[styleKey];
    changeFocus(selectedComp);
  }

  useEffect(() => {
    if (selectedComp !== document.body) {
      const newStyleList: TAbleStyle[] = [];
      Object.keys(selectedComp.id === "view" ? elementStyle.view : elementStyle[selectedComp.tagName.toLowerCase()]).forEach((key) => {
        newStyleList.push({ [key]: elementStyle[selectedComp.tagName.toLowerCase()][key] });
      });
      setStyleList(newStyleList);

      if (compAttribute[selectedComp.tagName.toLowerCase()]) {
        const newAttributeList: string[] = [];
        compAttribute[selectedComp.tagName.toLowerCase()].forEach((att) => {
          newAttributeList.push(att);
        });
        setAttributeList(newAttributeList);
      }
    }
  }, [selectedComp]);

  useEffect(() => {
    styleList.forEach((style: TAbleStyle) => {
      const styleKey = Object.keys(style)[0] as any;
      const styleComp = document.getElementById(Object.keys(style)[0]) as HTMLInputElement | null;
      if (styleComp) {
        styleComp.value = selectedComp.style[styleKey];
        styleComp.addEventListener("change", (e: any) => { changeStyle(e, styleKey); })
      }
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
        styleList.map((style: TAbleStyle, k: number) => {
          const value = Object.values(style)[0];
          const key = Object.keys(style)[0];
          if (value !== "detail") {
            return (
              <Style key={k}>
                <h1>{key}</h1>
                {
                  value !== "value"
                    ? (
                      <select onClick={(e) => { changeStyleEventListener(e.target, style) }} id={key}>
                        {
                          value.map((v, key) => (
                            <option key={key} value={v}>{v}</option>
                          ))
                        }
                      </select>
                    )
                    : <input onClick={(e) => { changeStyleEventListener(e.target, style) }} id={key} className={selectedComp.id} type={"text"} />
                }
              </Style>
            )
          }
        })
      }
      {
        selectedComp !== document.body && (
          isShowDetail
            ? <>
              <Style><h2 onClick={() => { setIsShowDetail(false) }}>그 외 스타일 접기</h2></Style>
              {
                styleList.map((style: any, key: number) => {
                  if (Object.values(style)[0] === "detail") {
                    return (
                      <Style key={key}>
                        <h1>{Object.keys(style)[0]}</h1>
                        <input onClick={(e) => { changeStyleEventListener(e.target, style) }} id={Object.keys(style)[0]} type={"text"} />
                      </Style>
                    )
                  }
                })
              }
            </>
            : <Style><h2 onClick={() => { setIsShowDetail(true) }}>그 외 스타일 펼치기</h2></Style>
        )
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
  z-index: 100;
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
  h2{
    margin-left: 12px;
    font-size: 12px;
    font-weight: bold;
    margin-top: 12px;
  }
  input{
    font-size: 13px;
    font-weight: bold;
    margin-right: 12px;
    padding:7px 8px;
    width:100px;
    border-radius: 4px;
    background-color: #ededed;
    text-align: center;
  }
  select{
    font-size: 13px;
    font-weight: bold;
    margin-right: 12px;
    padding:7px 8px;
    width:117px;
    border-radius: 4px;
    background-color: #ededed;
    text-align: center;
    option{
      font-size: 13px;
      font-weight: bold;
    }
  }
`

export default StyleSetting