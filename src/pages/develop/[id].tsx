import styled from 'styled-components'
import { useEffect } from 'react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const HvResult = dynamic(() => import('../../components/hvResult'), { ssr: false });
// const StyleSet = dynamic(() => import('../../components/styleSet'), { ssr: false });
import StyleSet from '../../components/styleSet';
import HvView from '../../components/hvView';
const LeftSideBar = dynamic(() => import('../../components/leftSideBar'), { ssr: false });
const NavBar = dynamic(() => import('../../components/navBar'), { ssr: false });
// const HvView = dynamic(() => import('../../components/hvView'), { ssr: false });

const HvDevelop: NextPage<{ hvData: any }> = ({ hvData }: { hvData: any }) => {
  const router = useRouter();
  const hvId = router.query.id as string;

  useEffect(() => {
    sessionStorage.removeItem(hvId + "selectComp");
  }, [])
  return (
    <>
      <HvResult />
      <NavBar />
      <Container>
        <LeftSideBar />
        <HvView />
        <StyleSet />
      </Container>
    </>
  )
}


// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data } = await SSR.API.graphql({ query: hvDatas });
//   const paths = data.listPosts.items.slice(0, 9).map((post: any) => ({
//     params: { id: post.id }
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