import styled from 'styled-components'
import StyleSet from '../../components/styleSet'
import HvView from "../../components/hvView"
import NavBar from '../../components/navBar'
import HvResult from '../../components/hvResult'
import LeftSideBar from '../../components/leftSideBar'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

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