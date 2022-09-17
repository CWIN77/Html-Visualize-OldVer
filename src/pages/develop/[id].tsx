import styled from 'styled-components';
import { useEffect } from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getHvData, listHvData } from "../../graphql/queries";
import { withSSRContext } from 'aws-amplify'
import { IHvData } from '../../types';
const HvResult = dynamic(() => import('../../components/hvResult'), { ssr: false });
const StyleSet = dynamic(() => import('../../components/styleSet'), { ssr: false });
const LeftSideBar = dynamic(() => import('../../components/leftSideBar'), { ssr: false });
const NavBar = dynamic(() => import('../../components/navBar'), { ssr: false });
const HvView = dynamic(() => import('../../components/hvView'), { ssr: false });
const SSR = withSSRContext();

const HvDevelop: NextPage<{ hvData: { getHvData: IHvData } }> = ({ hvData }: { hvData: { getHvData: IHvData } }) => {
  const router = useRouter();
  const hvId = router.query.id || JSON.parse(sessionStorage.getItem("hvId") || JSON.stringify(null));

  useEffect(() => {
    sessionStorage.removeItem(hvId + "selectComp");
  }, [])

  return (
    <>
      <HvResult />
      <NavBar />
      <Container>
        <LeftSideBar />
        <HvView hvHtml={hvData.getHvData.html} />
        <StyleSet />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await SSR.API.graphql({ query: listHvData });
  const paths = data.listHvData.items.slice(0, 9).map((hvData: any) => ({
    params: { id: hvData.id }
  }));
  return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await SSR.API.graphql({
    query: getHvData,
    variables: {
      id: params?.id
    }
  });
  return {
    props: {
      hvData: data
    },
    revalidate: 60,
  }
}

const Container = styled.div`
  width:100%;
  min-height:100%;
  display:flex;
`

export default HvDevelop;