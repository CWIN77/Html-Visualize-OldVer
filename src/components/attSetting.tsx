import styled from 'styled-components'
import { useStore } from "../zustant"
import { compAttribute } from "../comps/compData"
import { useEffect, useState } from 'react';

const AttSetting = () => {
  const { selectedComp }: { selectedComp: HTMLElement } = useStore();
  const [attList, setAttList] = useState<string[]>([]);

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
      <Name>Attribute</Name>
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
const Name = styled.h1`
  font-size: 13px;
  padding: 18px 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(54, 54, 54, 0.15);
`
const Att = styled.div`
  margin-top: 28px;
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

export default AttSetting