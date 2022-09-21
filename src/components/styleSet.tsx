import styled from 'styled-components'
import { useStore, changeHvStorage, getSelectComp } from "../stateManager"
import { elementStyle, styleName, compColors } from "../addableComps/compStyles"
import { IHvData, TAbleStyle } from "../types"
import { compAttribute } from "../addableComps/compData"
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const StyleSet = ({ hvData }: { hvData: IHvData }) => {
  const { isSelectChange } = useStore();
  const [styleList, setStyleList] = useState<TAbleStyle[]>([]);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [attList, setAttList] = useState<string[]>([]);
  const hvId = useParams().id || JSON.parse(sessionStorage.getItem("hvId") || JSON.stringify(null));

  const deleteComp = () => {
    const selectComp = getSelectComp(hvId);
    if (selectComp && selectComp !== document.body && selectComp.id !== "view") {
      selectComp.remove();
      const viewComp = document.getElementById("view") as HTMLElement;
      viewComp.style.boxShadow = "inset 0px 0px 0px 2.5px #0D99FF";
      useStore.setState({ isSelectChange: true });
      changeHvStorage(hvData);
    }
  }

  const colorToHex = (color: Number) => {
    const hexadecimal = color.toString(16).toUpperCase();
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }
  const changeStyle = (e: any, styleKey: any) => {
    const selectComp = getSelectComp(hvId);
    let inputValue = JSON.parse(JSON.stringify(e.target.value)).toLowerCase();
    if (selectComp) {
      if (inputValue in compColors) {
        inputValue = compColors[inputValue];
      }
      if (inputValue === "null" || inputValue === "none") {
        inputValue = "";
      }
      selectComp.style[styleKey] = inputValue;
      if (selectComp.style[styleKey] === "") {
        e.target.value = "none";
      } else {
        e.target.value = selectComp.style[styleKey];
      }
      if (e.target.type === "color") {
        const [r, g, b] = selectComp.style[styleKey].substr(4).slice(0, -1).split(",");
        e.target.value = "#" + colorToHex(Number(r)) + colorToHex(Number(g)) + colorToHex(Number(b));
        const colorText = document.getElementById(e.target.id + "colorText") as HTMLInputElement;
        colorText.value = "#" + colorToHex(Number(r)) + colorToHex(Number(g)) + colorToHex(Number(b));
      } else if (e.target.id.includes("colorText")) {
        const [r, g, b] = selectComp.style[styleKey].substr(4).slice(0, -1).split(",");
        if (r && g && b) {
          const colorInput = document.getElementById(e.target.id.replace("colorText", "")) as HTMLInputElement;
          colorInput.value = "#" + colorToHex(Number(r)) + colorToHex(Number(g)) + colorToHex(Number(b));
        }
      }
      changeHvStorage(hvData);
      selectComp.style.boxShadow = "inset 0px 0px 0px 2.5px #0D99FF";
    }
  }

  const changeAtt = (e: any, attName: string) => {
    const selectComp = getSelectComp(hvId);
    if (selectComp) {
      const viewElem = document.getElementById("view");
      if (attName === "name" && viewElem && e.target.value.toLowerCase() !== selectComp.className.toLowerCase()) {
        if (!document.querySelector("." + e.target.value)) {
          selectComp.className = e.target.value;
          sessionStorage.setItem(hvId + "selectComp", JSON.stringify(e.target.value));
        } else {
          e.target.value = selectComp.className;
          alert("동일한 이름의 요소가 있습니다.\n요소의 이름은 겹칠 수 없습니다.");
        }
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
      changeHvStorage(hvData);
    }
  }

  useEffect(() => {
    useStore.setState({ isSelectChange: false });
    const selectComp = getSelectComp(hvId);

    if (selectComp && selectComp.className) {
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
  }, [isSelectChange]);

  useEffect(() => {
    const selectComp = getSelectComp(hvId);

    styleList.forEach((style: TAbleStyle) => {
      const styleKey: any = Object.keys(style)[0];
      const styleComp = document.getElementById(styleKey) as HTMLInputElement | null;
      if (styleComp && selectComp) {
        if (selectComp.style[styleKey] === "") {
          styleComp.value = "none";
        } else {
          styleComp.value = selectComp.style[styleKey];
        }
        if (Object.values(style)[0] === "color") {
          const [r, g, b] = selectComp.style[styleKey].substr(4).slice(0, -1).split(",");
          styleComp.value = "#" + colorToHex(Number(r)) + colorToHex(Number(g)) + colorToHex(Number(b));
          const colorTextInput = document.getElementById(styleComp.id + "colorText") as HTMLInputElement;
          if (r && g && b && selectComp.style[styleKey] !== "") {
            colorTextInput.value = "#" + colorToHex(Number(r)) + colorToHex(Number(g)) + colorToHex(Number(b));
          } else {
            colorTextInput.value = "none";
          }
        }
      }
    })
  }, [styleList, isShowDetail])

  useEffect(() => {
    const selectComp = getSelectComp(hvId);
    if (selectComp) {
      attList.forEach((attName) => {
        const attComp = document.getElementById(attName) as HTMLInputElement | null;
        const attValue = attName !== "name" ? selectComp.getAttribute(attName) : selectComp.className;
        if (attComp && attValue) {
          if (attValue === "") {
            attComp.value = "none";
          } else {
            attComp.value = attValue;
          }
        }
      });
    }
  }, [attList])

  return (
    <Container>
      <Name>Style</Name>
      <AttContainer>
        {
          attList.map((attName, k: number) => {
            return (
              <Att key={k}>
                <h1>{attName}</h1>
                <input
                  onBlur={(e) => { changeAtt(e, attName) }}
                  onKeyDown={(e) => { if (e.key === "Enter") changeAtt(e, attName) }}
                  id={attName}
                  type={"text"}
                />
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
                    value === "value"
                      ? <StyleTextInput onBlur={(e) => { changeStyle(e, key) }} onKeyDown={(e) => { if (e.key === "Enter") changeStyle(e, key) }} id={key} type={"text"} />
                      : value === "color"
                        ? (
                          <>
                            <StyleColorInput type={"color"} id={key} onInput={(e) => { changeStyle(e, key) }} />
                            <StyleColorTextInput onBlur={(e) => { changeStyle(e, key) }} onKeyDown={(e) => { if (e.key === "Enter") changeStyle(e, key) }} id={key + "colorText"} type={"text"} />
                          </>
                        )
                        : (
                          <StyleSelectInput onChange={(e) => { changeStyle(e, key) }} id={key}>
                            {
                              value.map((v, key) => (
                                <option key={key} value={v}>{v}</option>
                              ))
                            }
                          </StyleSelectInput>
                        )
                  }
                </Style>
              )
            }
          })
        }
      </StyleContainer>

      {
        getSelectComp(hvId)?.className &&
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
        getSelectComp(hvId)?.className && getSelectComp(hvId).id !== "view" &&
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
`
const StyleTextInput = styled.input`
  font-size: 13px;
  font-weight: bold;
  width:100%;
  padding: 2px;
`
const StyleColorInput = styled.input`
  width:18px;
  padding: 2px;
`
const StyleColorTextInput = styled.input`
  font-size: 12px;
  font-weight: bold;
  width:calc(100% - 15px);
  padding: 2px;
`
const StyleSelectInput = styled.select`
  font-size: 13px;
  font-weight: bold;
  margin-right: 8px;
  width:100%;
  border: 2px solid #ededed;
  padding: 5px 0px;
  text-align: center;
  option{
    font-size: 13px;
    /* font-weight: bold; */
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