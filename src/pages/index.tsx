import dynamic from 'next/dynamic';
import styled from 'styled-components'
const UserInform = dynamic(() => import('../components/userInform'), { ssr: false });
const HvList = dynamic(() => import('../components/hvList'), { ssr: false });

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