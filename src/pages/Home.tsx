import styled from 'styled-components'
import Components from '../components/components'
import View from "../components/view"

const Home = () => {
  return (
    <Container>
      <Components />
      <ViewContainer>
        <View />
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
  min-height:100%;
  background-color: #C7C7C7;
  display:flex;
  align-items: center;
  justify-content: center;
`


export default Home
