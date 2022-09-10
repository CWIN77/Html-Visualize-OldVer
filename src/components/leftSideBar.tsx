import styled from 'styled-components'
import CompSet from './compSet'
import CompLayer from './compLayer'
import { useState } from 'react'

const LeftSideBar = () => {
  const [sidePage, setSidePage] = useState(0);
  return (
    <Container>
      <PageSelectBtn>
        <h1 style={{ opacity: sidePage === 0 ? "1" : "0.6" }} onClick={() => { setSidePage(0) }}>Comp</h1>
        <h1 style={{ opacity: sidePage === 1 ? "1" : "0.6" }} onClick={() => { setSidePage(1) }}>Layer</h1>
      </PageSelectBtn>
      {
        sidePage === 0 && <CompSet />
      }
      {
        sidePage === 1 && <CompLayer />
      }
    </Container>
  )
}

const Container = styled.div`
  left:0px;
  position: absolute;
  display:flex;
  flex-direction: column;
  overflow-y: auto;
  width:335px;
  height:calc(100vh - 46px);
  background-color: white;
  z-index: 10;
  &::-webkit-scrollbar{
    width:6px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    background-color: rgba(54,54,54,0.4);
  }
  @media screen and (max-width: 750px) {
    display: none;
  }
`
const PageSelectBtn = styled.span`
  display: flex;
  padding: 3px 10px;
  border-bottom: 1.5px solid rgba(54,54,54,0.25);
  h1{
    padding: 12px 10px;
    font-size: 13px;
    cursor: pointer;
    font-weight: bold;
  }
`

export default LeftSideBar