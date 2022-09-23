import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HvList from '../components/HvList';
import UserInform from '../components/UserInform';
import { getCurrentUser } from '../firebase/auth';
import { IUser } from '../types';

const Home = () => {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, [])

  return (
    <Container>
      <UserInform user={user} />
      <HvList user={user} />
    </Container>
  )
}

const Container = styled.div`
  width:100vw;
  min-height:100vh;
  background-color: #ededed;
  display:flex;
`

export default Home;