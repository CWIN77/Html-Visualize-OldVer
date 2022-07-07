import styled from 'styled-components'
import { useStore } from "../zustant"
import { elementStyle, styleName } from "../comps/compValue"
import { compAttribute } from "../comps/compData"
import { TAbleStyle } from "../types"
import { useEffect, useState } from 'react';
import Export from './Export';

const StyleSetting = () => {
  const { selectedComp }: { selectedComp: HTMLElement } = useStore();
  const [styleList, setStyleList] = useState<TAbleStyle[]>([]);
  const [attributeList, setAttributeList] = useState<string[]>([]);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const deleteComp = () => {
    if (selectedComp !== document.body && selectedComp.id !== "view") {
      selectedComp.remove();
      const viewComp = document.getElementById("view") as HTMLElement;
      viewComp.style.boxShadow = "inset 0px 0px 0px 3px #0D99FF";
      useStore.setState({ selectedComp: viewComp });
    }
  }

  const changeFocus = (target: HTMLElement) => {
    target.style.boxShadow = "inset 0px 0px 0px 3px #0D99FF";
  }

  const changeStyle = (e: any, styleKey: any) => {
    selectedComp.style[styleKey] = e.target.value;
    if (selectedComp.style[styleKey] === "") {
      e.target.value = "None";
    } else {
      e.target.value = selectedComp.style[styleKey];
    }
    changeFocus(selectedComp);
  }

  useEffect(() => {
    if (selectedComp !== document.body) {
      const newStyleList: TAbleStyle[] = [];
      Object.keys(selectedComp.id === "view" || selectedComp === document.body ? elementStyle.view : elementStyle[selectedComp.tagName.toLowerCase()]).forEach((key) => {
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
        if (selectedComp.style[styleKey] === "") {
          styleComp.value = "none";
        } else {
          styleComp.value = selectedComp.style[styleKey];
        }
      }
    })
  }, [styleList, attributeList, isShowDetail])

  return (
    <Container>
      <Name>Style</Name>
      {/* {
        attributeList.map((style, key) => (
          <Style key={key}>{style}</Style>
        ))
      } */}
      <StyleContainer>
        {
          styleList.map((style: TAbleStyle, k: number) => {
            const value = Object.values(style)[0];
            const key = Object.keys(style)[0];
            const name = styleName[Object.keys(style)[0]];
            if (value !== "detail") {
              return (
                <Style key={k}>
                  <h1 title={key}>{name}</h1>
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
      </StyleContainer>
      {
        isShowDetail
          ? <Style><h2 onClick={() => { setIsShowDetail(false) }}>그 외 스타일 접기</h2></Style>
          : <Style><h2 onClick={() => { setIsShowDetail(true) }}>그 외 스타일 펼치기</h2></Style>
      }
      <StyleContainer>
        {
          styleList.map((style: TAbleStyle, k: number) => {
            const value = Object.values(style)[0];
            const key = Object.keys(style)[0];
            const name = styleName[Object.keys(style)[0]];
            if (value === "detail" && isShowDetail) {
              return (
                <Style key={key}>
                  <h1>{name}</h1>
                  <input onBlur={(e) => { changeStyle(e, key) }} onKeyDown={(e) => { if (e.key === "Enter") changeStyle(e, key) }} id={Object.keys(style)[0]} type={"text"} />
                </Style>
              )
            }
          })
        }
      </StyleContainer>


      <span style={{ paddingTop: 24 }}></span>
      {
        selectedComp !== document.body && selectedComp.id !== "view" &&
        <DeleteComp><h1 onClick={deleteComp}>요소 삭제</h1></DeleteComp>
      }
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
const StyleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
const Name = styled.h1`
  font-size: 13px;
  padding: 18px 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(54, 54, 54, 0.15);
`
const Style = styled.div`
  margin-top: 28px;
  display:flex;
  align-items: center;
  width:50%;
  h1{
    min-width:46px;
    margin-left: 14px;
    font-size: 12px;
    font-weight: bold;
    opacity: 0.75;
  }
  h2{
    padding : 8px;
    margin-left: 4px;
    font-size: 12px;
    font-weight: bold;
    margin-top: 4px;
    cursor: pointer;
  }
  input{
    font-size: 13px;
    font-weight: bold;
    border-radius: 4px;
    width:100%;
    padding: 2px;
  }
  select{
    font-size: 13px;
    font-weight: bold;
    margin-right: 8px;
    width:100%;
    border-radius: 4px;
    border: 2px solid #ededed;
    padding: 5px 0px;
    text-align: center;
    option{
      font-size: 13px;
      font-weight: bold;
    }
  }
`
const DeleteComp = styled.div`
  width:100%;
  display:flex;
  align-items: center;
  justify-content: center;
  h1{
    background-color: #ea1601;
    padding: 10px 16px;
    border-radius: 4px;
    color:white;
  }
`

export default StyleSetting