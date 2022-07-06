import { useEffect } from 'react'
import styled from 'styled-components'
import Components from '../components/components'
import StyleSetting from '../components/styleSetting'
import View from "../components/view"
import { useStore } from '../zustant'

const Home = () => {
  const { selectedComp }: { selectedComp: HTMLElement } = useStore();
  return (
    <Container>
      <Components />
      <ViewContainer>
        <View />
        <ViewBackground id="viewBackground" />
      </ViewContainer>
      <StyleSetting />
    </Container>
  )
}

const Container = styled.div`
  width:100%;
  min-height:100%;
  display:flex;
`
const ViewContainer = styled.div`
  width:calc(100% - 335px - 280px);
  min-height:calc(100% - 36px);
  display:flex;
  align-items: center;
  justify-content: center;
`
const ViewBackground = styled.span`
  position: absolute;
  width:calc(100% - 335px - 280px);
  min-height:calc(100% - 36px);
  background-color: #ededed;
  z-index: 1;
`


export default Home
