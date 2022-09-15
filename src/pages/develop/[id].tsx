import styled from 'styled-components'
import StyleSet from '../../components/styleSet'
import HvView from "../../components/hvView"
import NavBar from '../../components/navBar'
import HvResult from '../../components/hvResult'
import LeftSideBar from '../../components/leftSideBar'

const HvDevelop = () => {
  //TODO: 코드구조 변경
  //TODO:any타입 제거
  return (
    <>
      <HvResult />
      <NavBar />
      <Container>
        <LeftSideBar />
        <HvView />
        <StyleSet />
      </Container>
    </>
  )
}

const Container = styled.div`
  width:100%;
  min-height:100%;
  display:flex;
`

export default HvDevelop;