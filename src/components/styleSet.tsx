import styled from 'styled-components'
import { useStore, changeHvStorage, getSelectComp } from "../stateManager"
import { elementStyle, styleName } from "../addableComps/compStyles"
import { TAbleStyle } from "../types"
import { compAttribute } from "../addableComps/compData"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const StyleSet = () => {
  const { isSelectChange }: { isSelectChange: boolean } = useStore();
  const [styleList, setStyleList] = useState<TAbleStyle[]>([]);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [attList, setAttList] = useState<string[]>([]);
  const hvId = useParams().id as string;

  const deleteComp = () => {
    const selectComp = getSelectComp(hvId);

    if (selectComp !== document.body && selectComp.id !== "view") {
      selectComp.remove();
      const viewComp = document.getElementById("view") as HTMLElement;
      viewComp.style.boxShadow = "inset 0px 0px 0px 2.5px #0D99FF";
      useStore.setState({ isSelectChange: true });
      changeHvStorage(hvId);
    }
  }

  const changeFocus = (target: HTMLElement) => {
    target.style.boxShadow = "inset 0px 0px 0px 2.5px #0D99FF";
  }

  const changeStyle = (e: any, styleKey: any) => {
    const selectComp = getSelectComp(hvId);

    selectComp.style[styleKey] = e.target.value;
    if (selectComp.style[styleKey] === "") {
      e.target.value = "none";
    } else {
      e.target.value = selectComp.style[styleKey];
    }
    changeHvStorage(hvId);
    changeFocus(selectComp);
  }

  const changeAtt = (e: any, attName: string) => {
    const selectComp = getSelectComp(hvId);

    if (attName === "name") {
      selectComp.className = e.target.value;
    } else {
      selectComp.setAttribute(attName, e.target.value);
    }
    const attValue = attName !== "name" ? selectComp.getAttribute(attName) : selectComp.className;
    e.target.value = attValue;
    if (attValue === "") {
      e.target.value = "none";
    } else {
      e.target.value = attValue;
    }

    changeHvStorage(hvId);
  }

  useEffect(() => {
    if (isSelectChange) {
      useStore.setState({ isSelectChange: false });
      const selectComp = getSelectComp(hvId);
      if (selectComp !== document.body) {
        const newStyleList: TAbleStyle[] = [];
        if (selectComp.id === "view" || selectComp === document.body) {
          Object.keys(elementStyle.view).forEach((key) => {
            newStyleList.push({ [key]: elementStyle["view"][key] });
          });
        } else {
          Object.keys(elementStyle[selectComp.tagName.toLowerCase()]).forEach((key) => {
            newStyleList.push({ [key]: elementStyle[selectComp.tagName.toLowerCase()][key] });
          });
        }
        setStyleList(newStyleList);

        const newAttList: string[] = [];
        newAttList.push("name");
        if (compAttribute[selectComp.tagName.toLowerCase()]) {
          compAttribute[selectComp.tagName.toLowerCase()].forEach((att) => {
            newAttList.push(att);
          });
        }
        setAttList(newAttList);
      }
    }
  }, [isSelectChange]);

  useEffect(() => {
    const selectComp = getSelectComp(hvId);

    styleList.forEach((style: TAbleStyle) => {
      const styleKey = Object.keys(style)[0];
      const styleComp = document.getElementById(styleKey) as HTMLInputElement | null;
      if (styleComp) {
        if (selectComp.style[styleKey as any] === "") {
          styleComp.value = "none";
        } else {
          styleComp.value = selectComp.style[styleKey as any];
        }
      }
    })
  }, [styleList, isShowDetail])

  useEffect(() => {
    const selectComp = getSelectComp(hvId);
    attList.forEach((att) => {
      const attName = att;
      const attComp = document.getElementById(attName) as HTMLInputElement | null;
      const attValue = attName !== "name" ? selectComp.getAttribute(attName) : selectComp.className;
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
        getSelectComp(hvId) !== document.body &&
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
        getSelectComp(hvId) && getSelectComp(hvId) !== document.body && getSelectComp(hvId).id !== "view" &&
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
  z-index: 10;
  &::-webkit-scrollbar{
    width: 6px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    background-color: rgba(54, 54, 54, 0.4);
  }
  @media screen and (max-width: 750px) {
    display:none;
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
  padding: 17px 19px;
  border-bottom: 1.5px solid rgba(54,54,54,0.25);
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
    opacity: 0.75;
  }
  h2{
    padding : 8px;
    margin-left: 4px;
    font-size: 12px;
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
      /* font-weight: bold; */
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

export default StyleSet;