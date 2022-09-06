import styled from 'styled-components'
import AddComp from '../components/addComp'
import StyleSetting from '../components/styleSetting'
import View from "../components/hvView"
import Nav from '../components/navBar'
import HvResult from '../components/hvResult'

const HvDevelop = () => {
  return (
    <>
      <HvResult />
      <Nav />
      <Container>
        <AddComp />
        <View />
        <StyleSetting />
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
