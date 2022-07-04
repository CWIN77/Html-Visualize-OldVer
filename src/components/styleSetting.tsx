import styled from 'styled-components'
import { useStore } from "../zustant"
import { elementStyle } from "../comps/compValue"
import { useEffect } from 'react';
import Export from './Export';

const StyleSetting = () => {
  const iconProps = { fill: "#363636", width: 18, height: 18, style: { padding: 2, marginLeft: 10, cursor: "pointer" } };
  const { selectedComp }: { selectedComp: HTMLElement } = useStore();

  return (
    <Container>
      {/* <Export /> */}
      <Name>Style</Name>
      <div onClick={() => {
        Object.keys(elementStyle[selectedComp.tagName.toLowerCase()]).forEach((key: any) => {
          console.log(elementStyle[selectedComp.tagName.toLowerCase()][key])
        })
        // selectedComp.get
      }}>현재 선택된 값 출력</div>
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