import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import Develop from './pages/Develop'
import Home from './pages/Home'
import Nav from './components/nav'

const App = () => {
  return (
    <Container>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/develop/:id" element={<Develop />} />
      </Routes>
    </Container>
  )
}

const Container = styled.div`
  width:100%;
  min-height:100%;
`

export default App
