import { useEffect, useState } from 'react'
import styled from 'styled-components'

const View = () => {
  const [SmouseoverComp, setMouseoverComp] = useState(document.body);
  const [SclickedComp, setClickedComp] = useState(document.body);
  const [isAddEvent, setIsAddEvent] = useState(false);
  useEffect(() => {
    if (!isAddEvent) {
      setIsAddEvent(true);
      let mouseoverComp = document.body;
      let clickedComp = document.body;
      document.getElementById('view')?.addEventListener("mouseover", (e: any) => {
        if (mouseoverComp !== clickedComp) {
          mouseoverComp.style.boxShadow = "";
        }
        e.target.style.boxShadow = "0px 0px 0px 2px rgba(18,100,163,0.5) inset";
        e.target.addEventListener("click", (f: any) => {
          clickedComp.style.boxShadow = "";
          clickedComp.removeEventListener("click", () => { })
          f.target.style.boxShadow = "0px 0px 0px 2px rgba(18,100,163,0.9) inset";
          setClickedComp(f.target);
          clickedComp = f.target;
        })
        setMouseoverComp(e.target);
        mouseoverComp = e.target;
      })
      document.getElementById('view')?.parentNode?.childNodes[1].addEventListener("click", () => {
        mouseoverComp.style.boxShadow = "";
        clickedComp.style.boxShadow = "";
      })
      document.getElementById('view')?.parentNode?.childNodes[1].addEventListener("mouseover", () => {
        if (mouseoverComp !== clickedComp) {
          mouseoverComp.style.boxShadow = "";
        }
      })
    }
  }, [])

  return (
    <Container id='view'>
      <div>gpffhs</div>
    </Container>
  )
}

const Container = styled.div`
  width:395px;
  height:720px;
  background-color: white;
  border-radius: 12px;
  z-index: 2;
`

export default View