import { useEffect } from 'react'
import styled from 'styled-components'

const View = () => {
  useEffect(() => {
    let mouseoverComp = document.body;
    let clickedComp = document.body;

    document.getElementById('view')?.addEventListener("mouseover", (e: any) => {
      if (mouseoverComp !== clickedComp) {
        mouseoverComp.style.boxShadow = "";
      }
      e.target.style.boxShadow = "0px 0px 0px 2px rgba(18,100,163,0.4) inset";
      e.target.addEventListener("click", (f: any) => {
        clickedComp.style.boxShadow = "";
        clickedComp.removeEventListener("click", () => { })
        f.target.style.boxShadow = "0px 0px 0px 2px rgba(18,100,163,0.8) inset";
        // console.log(f.target.parentElement)
        clickedComp = f.target;
      })
      mouseoverComp = e.target;
    })
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
`

export default View