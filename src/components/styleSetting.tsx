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
    console.log(selectedComp)
    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Delete" && selectedComp !== document.body && selectedComp.id !== "view") {
        selectedComp.remove();
        changeFocus(document.getElementById("view") as HTMLElement);
      }
    });
  }, [selectedComp])

  const changeFocus = (target: HTMLElement) => {
    target.style.boxShadow = "inset 0px 0px 0px 3px #0D99FF";
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
      const styleComp = document.getElementById(styleKey) as HTMLInputElement | null;
      if (styleComp) {
        styleComp.value = selectedComp.style[styleKey];
        // styleComp.addEventListener("focusout", (e) => {
        //   changeStyle(e, styleKey);
        // })
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
                      <select onChange={(e) => { changeStyle(e, key) }} id={key} className={selectedComp.id}>
                        {
                          value.map((v, key) => (
                            <option key={key} value={v}>{v}</option>
                          ))
                        }
                      </select>
                    )
                    : <input onBlur={(e) => { changeStyle(e, key) }} onKeyDown={(e) => { if (e.key === "Enter") changeStyle(e, key) }} id={key} className={selectedComp.id} type={"text"} />
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
                        <input onBlur={(e) => { changeStyle(e, key) }} onKeyDown={(e) => { if (e.key === "Enter") changeStyle(e, key) }} id={Object.keys(style)[0]} type={"text"} />
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