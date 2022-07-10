import { Link } from 'react-router-dom'
import styled from 'styled-components'
import User from '../components/user'

const Home = () => {
  return (
    <Container>
      <User />
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
