import styled from 'styled-components'
import Components from '../components/components'
import View from "../components/view"

const Home = () => {
  return (
    <Container>
      <Components />
      <ViewContainer>
        <View />
        <ViewBackground />
      </ViewContainer>
    </Container>
  )
}


const Container = styled.div`
  width:100%;
  min-height:100%;
  display:flex;
`
const ViewContainer = styled.div`
  width:calc(100% - 350px);
  min-height:calc(100% - 34px);
  display:flex;
  align-items: center;
  justify-content: center;
`
const ViewBackground = styled.span`
  position: absolute;
  width:calc(100% - 350px);
  min-height:calc(100% - 34px);
  background-color: #C7C7C7;
  z-index: 1;
`


export default Home
