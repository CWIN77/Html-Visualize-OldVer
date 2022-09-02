import styled from 'styled-components'
import { useStore } from "../zustant"
import { elementStyle, styleName } from "../comps/compValue"
import { TAbleStyle } from "../types"
import { compAttribute } from "../comps/compData"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StyleSetting = () => {
  const { selectedComp }: { selectedComp: HTMLElement } = useStore();
  const [styleList, setStyleList] = useState<TAbleStyle[]>([]);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [attList, setAttList] = useState<string[]>([]);
  const developId = useParams().id as string;

  const deleteComp = () => {
    if (selectedComp !== document.body && selectedComp.id !== "view") {
      selectedComp.remove();
      const viewComp = document.getElementById("view") as HTMLElement;
      viewComp.style.boxShadow = "inset 0px 0px 0px 2.5px #0D99FF";
      useStore.setState({ selectedComp: viewComp });
      const sHistory: string[] = JSON.parse(sessionStorage.getItem(developId) || JSON.stringify([]));
      sessionStorage.setItem(developId, JSON.stringify([...sHistory, document.getElementById("view")?.outerHTML as string]));
    }
  }

  const changeFocus = (target: HTMLElement) => {
    target.style.boxShadow = "inset 0px 0px 0px 2.5px #0D99FF";
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

  const changeAtt = (e: any, attName: string) => {
    if (attName === "name") {
      selectedComp.className = e.target.value;
    } else {
      selectedComp.setAttribute(attName, e.target.value);
    }
    const attValue = attName !== "name" ? selectedComp.getAttribute(attName) : selectedComp.className;
    e.target.value = attValue;
    if (attValue === "") {
      e.target.value = "none";
    } else {
      e.target.value = attValue;
    }
  }

  useEffect(() => {
    if (selectedComp !== document.body) {
      const newStyleList: TAbleStyle[] = [];
      if (selectedComp.id === "view" || selectedComp === document.body) {
        Object.keys(elementStyle.view).forEach((key) => {
          newStyleList.push({ [key]: elementStyle["view"][key] });
        });
      } else {
        Object.keys(elementStyle[selectedComp.tagName.toLowerCase()]).forEach((key) => {
          newStyleList.push({ [key]: elementStyle[selectedComp.tagName.toLowerCase()][key] });
        });
      }
      setStyleList(newStyleList);

      if (compAttribute[selectedComp.tagName.toLowerCase()]) {
        const newAttList: string[] = [];
        compAttribute[selectedComp.tagName.toLowerCase()].forEach((att) => {
          newAttList.push(att);
        });
        setAttList(newAttList);
      }
    }
  }, [selectedComp]);

  useEffect(() => {
    styleList.forEach((style: TAbleStyle) => {
      const styleKey = Object.keys(style)[0];
      const styleComp = document.getElementById(styleKey) as HTMLInputElement | null;
      if (styleComp) {
        if (selectedComp.style[styleKey as any] === "") {
          styleComp.value = "none";
        } else {
          styleComp.value = selectedComp.style[styleKey as any];
        }
      }
    })
  }, [styleList, isShowDetail])

  useEffect(() => {
    attList.forEach((att) => {
      const attName = att;
      const attComp = document.getElementById(attName) as HTMLInputElement | null;
      const attValue = attName !== "name" ? selectedComp.getAttribute(attName) : selectedComp.className;
      if (attComp && attValue !== null) {
        if (attValue === "") {
          attComp.value = "none";
        } else {
          attComp.value = attValue;
        }
      }
    });
  }, [attList])

  return (
    <Container>
      <Name>Style</Name>
      <AttContainer>
        {
          attList.map((att, k: number) => {
            const attName = att;
            return (
              <Att key={k}>
                <h1>{attName}</h1>
                <input onBlur={(e) => { changeAtt(e, attName) }} onKeyDown={(e) => { if (e.key === "Enter") changeAtt(e, attName) }} id={attName} type={"text"} />
              </Att>
            )
          })
        }
      </AttContainer>
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
                        <select onChange={(e) => { changeStyle(e, key) }} id={key}>
                          {
                            value.map((v, key) => (
                              <option key={key} value={v}>{v}</option>
                            ))
                          }
                        </select>
                      )
                      : <input onBlur={(e) => { changeStyle(e, key) }} onKeyDown={(e) => { if (e.key === "Enter") changeStyle(e, key) }} id={key} type={"text"} />
                  }
                </Style>
              )
            }
          })
        }
      </StyleContainer>

      {
        selectedComp !== document.body &&
        <Style><h2 onClick={() => { setIsShowDetail(!isShowDetail) }}>{isShowDetail ? "그 외 스타일 접기" : "그 외 스타일 펼치기"}</h2></Style>
      }
      <StyleContainer>
        {
          styleList.map((style: TAbleStyle, k: number) => {
            const value = Object.values(style)[0];
            const key = Object.keys(style)[0];
            const name = styleName[Object.keys(style)[0]];
            if (value === "detail" && isShowDetail) {
              return (
                <Style key={k}>
                  <h1>{name}</h1>
                  <input onBlur={(e) => { changeStyle(e, key) }} onKeyDown={(e) => { if (e.key === "Enter") changeStyle(e, key) }} id={Object.keys(style)[0]} type={"text"} />
                </Style>
              )
            }
          })
        }
      </StyleContainer>

      <span style={{ paddingTop: 24 }} />
      {
        selectedComp !== document.body && selectedComp.id !== "view" &&
        <DeleteComp><h1 onClick={deleteComp}>요소 삭제</h1></DeleteComp>
      }
    </Container >
  )
}

const Container = styled.div`
  position: absolute;
  right:0px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 280px;
  height: calc(100vh - 46px);
  background-color: white;
  z-index: 100;
  &::-webkit-scrollbar{
    width: 6px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    background-color: rgba(54, 54, 54, 0.4);
  }
`
const AttContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const Att = styled.div`
  margin-top: 20px;
  margin-bottom: 4px;
  display:flex;
  align-items: center;
  h1{
    margin-left: 14px;
    margin-right: 16px;
    font-size: 12px;
    font-weight: bold;
    opacity: 0.75;
  }
  input{
    font-size: 13px;
    font-weight: bold;
    border-radius: 4px;
    padding: 2px;
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
