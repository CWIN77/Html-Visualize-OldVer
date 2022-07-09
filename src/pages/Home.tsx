import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Home = () => {
  return (
    <Container>
      <Link to="/develop/id">디벨롭 페이지로 이동</Link>
    </Container>
  )
}

const Container = styled.div`
  width:100%;
  min-height:100%;
`

export default Home
