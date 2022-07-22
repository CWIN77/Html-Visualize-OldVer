import styled from 'styled-components'
import Components from '../../components/components'
import StyleSetting from '../../components/styleSetting'
import View from "../../components/view"
import Nav from '../../components/nav'
const Develop = () => {
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

const Container = styled.div`
  width:100%;
  min-height:100%;
  display:flex;
`


export default Develop
