import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import HvDevelop from './pages/HvDevelop'
import Home from './pages/Home'
import Friends from './components/Home/Friends'
import Community from './components/Home/Community'

const App = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/community" element={<Community />} />
        <Route path="/hv/:id" element={<HvDevelop />} />
      </Routes>
    </Container>
  )
}

const Container = styled.div`
  width:100%;
  min-height:100%;
`

export default App