import styled from 'styled-components';
import HvList from '../components/hvList';
import UserInform from '../components/userInform';

const Home = () => {
  return (
    <Container>
      <UserInform />
      <HvList />
    </Container>
  )
}

const Container = styled.div`
  width:100vw;
  min-height:calc(100vh - 46px);
  background-color: #F5F5F5;
  display:flex;
`

export default Home;