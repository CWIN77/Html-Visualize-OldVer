import styled from 'styled-components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getHvData, listHvData } from "../graphql/queries";
import { API } from 'aws-amplify';
import { IHvData } from '../types';
import HvResult from "../components/hvResult";
import StyleSet from "../components/styleSet";
import LeftSideBar from "../components/leftSideBar";
import NavBar from "../components/navBar";
import HvView from "../components/hvView";

const HvDevelop = () => {
  const hvId = useParams().id || JSON.parse(sessionStorage.getItem("hvId") || JSON.stringify(null));

  useEffect(() => {
    sessionStorage.removeItem(hvId + "selectComp");
  }, [])

  return (
    <>
      <HvResult />
      <NavBar />
      <Container>
        <LeftSideBar />
        <HvView hvHtml={"<div class=\"App\" style=\"width: 100%; height: 100%; overflow: auto; display: flex; background-color: white; align-items: center; justify-content: center;\" id=\"view\"><h1 style=\"font-size: 18px; display: inline;\" class=\"hv27qW6k\" contenteditable=\"false\">HTML Visualize<br></h1></div>"} />
        <StyleSet />
      </Container>
    </>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data } = await SSR.API.graphql({ query: listHvData });
//   const paths = data.listHvData.items.slice(0, 9).map((hvData: any) => ({
//     params: { id: hvData.id }
//   }));
//   return { paths, fallback: "blocking" }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { data } = await SSR.API.graphql({
//     query: getHvData,
//     variables: {
//       id: params?.id
//     }
//   });
//   return {
//     props: {
//       hvData: data
//     },
//     revalidate: 60,
//   }
// }

const Container = styled.div`
  width:100%;
  min-height:100%;
  display:flex;
`

export default HvDevelop;