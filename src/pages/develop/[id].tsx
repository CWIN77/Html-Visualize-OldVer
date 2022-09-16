import styled from 'styled-components'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const HvResult = dynamic(() => import('../../components/hvResult'), { ssr: false });
const StyleSet = dynamic(() => import('../../components/styleSet'), { ssr: false });
const LeftSideBar = dynamic(() => import('../../components/leftSideBar'), { ssr: false });
const NavBar = dynamic(() => import('../../components/navBar'), { ssr: false });
const HvView = dynamic(() => import('../../components/hvView'), { ssr: false });

const HvDevelop = () => {
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

const Container = styled.div`
  width:100%;
  min-height:100%;
  display:flex;
`

export default HvDevelop;