import { useEffect } from 'react'
import styled from 'styled-components'
import Components from '../components/components'
import StyleSetting from '../components/styleSetting'
import View from "../components/view"

const Home = () => {
  let zoom = 1;

  const zoomEvent = (e: WheelEvent) => {
    const zoomComp = document.getElementById("viewContainer");
    const target = e.target as HTMLElement;
    if (target.id === "viewBackground") {
      if (e.deltaY > 0) { // 스크롤 다운
        if (zoomComp !== null) {
          if (zoom > 0.25) {
            zoom -= 0.05;
            zoomComp.style.transform = `scale(${zoom}, ${zoom})`;
          }
        }
      } else { // 스크롤 업
        if (zoomComp !== null) {
          if (zoom < 1.75) {
            zoom += 0.05;
            zoomComp.style.transform = `scale(${zoom}, ${zoom})`;
          }
        }
      }
    }
  }

  useEffect(() => {
    document.body.addEventListener('wheel', zoomEvent);
  }, [])

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
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width:12px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    width: 12px;
    background-color: rgba(54,54,54,0.4);
    border-radius: 100px;
  }
`
const ViewBackground = styled.span`
  position: absolute;
  width:calc(100% - 335px - 280px);
  min-height:calc(100% - 36px);
  background-color: #ededed;
  z-index: 1;
`


export default Home
