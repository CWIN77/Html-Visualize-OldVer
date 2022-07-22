import type { NextPage } from 'next'
import styled from 'styled-components'
import User from '../components/user'
import DevelopList from '../components/developList'

const Home: NextPage = () => {
  return (
    <Container>
      <User />
      <DevelopList/>
    </Container>
  )
}

const Container = styled.div`
  width:100vw;
  min-height:calc(100vh - 46px);
  background-color: #F5F5F5;
  display:flex;
`

export default Home