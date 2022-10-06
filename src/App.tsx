import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import HvDevelop from './pages/HvDevelop';
import Home from './pages/Home';
import { useEffect } from 'react';
import { getCurrentUser } from './firebase/auth';
import { getUser } from './graphql/queries';
import { IUser } from './types';
import { API } from 'aws-amplify';
import { createUser } from './graphql/mutations';

const App = () => {
  const checkUserInData = async () => {
    const user = getCurrentUser();
    if (user) {
      const isUserInDb = await API.graphql({
        query: getUser,
        variables: { id: user.id }
      }) as { data: { getUser: IUser | null } };
      if (!isUserInDb.data.getUser) {
        await API.graphql({
          query: createUser,
          variables: {
            input: {
              img: user.img,
              name: user.name,
              id: user.id,
              joinId: user.joinId,
              friends: []
            }
          }
        });
      }
    }
  }

  useEffect(() => {
    checkUserInData();
  }, [])

  return (
    <Container>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/hv/:id" element={<HvDevelop />} />
      </Routes>
    </Container>
  )
}

const Container = styled.div`
  width:100%;
  min-height:100%;
`

export default App