import { useEffect, useState } from 'react'
import styled from 'styled-components'
const View = () => {
  const [SmouseoverComp, setMouseoverComp] = useState(document.body);
  const [SclickedComp, setClickedComp] = useState(document.body);
  const [isAddEvent, setIsAddEvent] = useState(false);
  const getStyle = (comp: any) => {
    const style = []
    for (let i = 0; ; i++) {
      if (comp.style[i]) {
        style.push(comp.style[i])
      } else {
        break;
      }
    }
    let styleString = ""
    style.map((data) => {
      styleString += data + ": " + comp.style.getPropertyValue(data) + "; "
    })
    const newComp = "const Comp1 = styled.div`" + styleString + "`"
    // console.log(newComp)
  }
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

          // f.target.remove()
          setClickedComp(f.target);

          getStyle(f.target)

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

export default View