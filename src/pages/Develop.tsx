import styled from 'styled-components'
import Components from '../components/components'
import Nav from '../components/nav'
import StyleSetting from '../components/styleSetting'
import View from "../components/view"

const Develop = () => {
  return (
    <Container>
      <Nav />
      <div>
        <Components />
        <View />
        <StyleSetting />
      </div>
    </Container>
  )
}

const Container = styled.div`
  width:100%;
  min-height:100%;
  div{
    display:flex;
  }
`


export default Develop
