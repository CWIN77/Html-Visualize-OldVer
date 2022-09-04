import styled from 'styled-components'
import Components from '../components/addComp'
import StyleSetting from '../components/styleSetting'
import View from "../components/hvView"
import Nav from '../components/navBar'

const HvDevelop = () => {
  return (
    <>
      <Nav />
      <Container>
        <Components />
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
