import styled from 'styled-components'
import User from '../components/userInform'
import HvList from '../components/hvList'

const Home = () => {
  return (
    <Container>
      <User />
      <HvList />
    </Container>
  )
}
export default Home;

const Container = styled.div`
  width:100vw;
  min-height:calc(100vh - 46px);
  background-color: #F5F5F5;
  display:flex;
`
