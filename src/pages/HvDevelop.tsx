import styled from 'styled-components'
import CompSet from '../components/compSet'
import StyleSet from '../components/styleSet'
import View from "../components/hvView"
import Nav from '../components/navBar'
import HvResult from '../components/hvResult'

const HvDevelop = () => {
  //TODO: 코드구조 변경
  return (
    <>
      <HvResult />
      <Nav />
      <Container>
        <CompSet />
        <View />
        <StyleSet />
      </Container>
    </>
  )
}
export default HvDevelop;

const Container = styled.div`
  width:100%;
  min-height:100%;
  display:flex;
`
