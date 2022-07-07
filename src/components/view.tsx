import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../zustant'

const View = () => {
  const [isAddEvent, setIsAddEvent] = useState(false);
  const { selectedComp }: { selectedComp: HTMLElement } = useStore();

  useEffect(() => {
    if (!isAddEvent) {
      setIsAddEvent(true);
      let mouseoverComp = document.body;
      let clickedComp = document.body;
      document.getElementById('view')?.addEventListener("mouseover", (e: any) => {
        if (mouseoverComp !== clickedComp) {
          mouseoverComp.style.boxShadow = "";
        }
        e.target.style.boxShadow = "inset 0px 0px 0px 3px #8bccfb";
        e.target.addEventListener("click", (f: any) => {
          clickedComp.style.boxShadow = "";
          f.target.style.boxShadow = "inset 0px 0px 0px 3px #0D99FF";
          clickedComp = f.target;
          useStore.setState({ selectedComp: clickedComp });
          document.body.addEventListener('keydown', (e: any) => {
            if (e.key === 'c' && e.ctrlKey) {
              console.log('Ctrl+C', clickedComp);
            } else if (e.key === 'v' && e.ctrlKey) {
              console.log('Ctrl+V', clickedComp);
            }
          });
        })
        mouseoverComp = e.target;
      })
      document.getElementById('viewBackground')?.addEventListener("click", () => {
        mouseoverComp.style.boxShadow = "";
        clickedComp.style.boxShadow = "";
      })
      document.getElementById('viewBackground')?.addEventListener("mouseover", () => {
        if (mouseoverComp !== clickedComp) {
          mouseoverComp.style.boxShadow = "";
        }
      })
    }
  }, [])

  return (
    <Container>
      <div style={{ width: "100%", height: "100%" }} id='view' />
    </Container>
  )
}

const Container = styled.div`
  width:395px;
  height:720px;
  background-color: white;
  border-radius: 8px;
  z-index: 2;
  overflow: auto;
  &::-webkit-scrollbar{
    width:8px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    width: 8px;
    background-color: rgba(54,54,54,0.4);
    border-radius: 100px;
  }
`
const SizeWrapper = styled.span`
  position: absolute;
  z-index: -100;
`

export default View