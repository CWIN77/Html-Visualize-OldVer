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

  useEffect(() => {
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
  }, [selectedComp]);

  return (
    <Container>
      <Export />
      <Name>Style</Name>
      {
        attributeList.map((style, key) => (
          <div key={key}>{style}</div>
        ))
      }
      {
        styleList.map((style, key) => (
          <div key={key}>{style}</div>
        ))
      }
    </Container >
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

export default StyleSetting