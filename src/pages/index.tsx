import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import HvList from '../components/hvList';
const UserInform = dynamic(() => import('../components/userInform'), { ssr: false });
import { withSSRContext } from 'aws-amplify';
import { listHvData } from '../graphql/queries';
const SSR = withSSRContext();
import { getCurrentUser } from "../firebase/auth";
import { useEffect } from 'react';

// const HvList = dynamic(() => import('../components/hvList'), { ssr: false });
// import UserInform from '../components/userInform';

const Home = () => {
  return (
    <Container>
      <UserInform />
      <HvList />
    </Container>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   // const user = getCurrentUser();
//   // console.log(user);
//   const { data }: any = await SSR.API.graphql({
//     query: listHvData,
//     variables: {
//       filter: { author: { contains: "01" } }
//     }
//   })
//   return {
//     props: {
//       hvList: data.listHvData.items
//     }
//   }
// }

const Container = styled.div`
  width:100vw;
  min-height:calc(100vh - 46px);
  background-color: #F5F5F5;
  display:flex;
`

export default Home;