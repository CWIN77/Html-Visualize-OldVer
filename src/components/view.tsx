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
      const sizeWrapper1: any = document.getElementById("sizeWrapper1");
      const sizeWrapper2: any = document.getElementById("sizeWrapper2");
      document.getElementById('view')?.addEventListener("mouseover", (e: any) => {

        const targetStyle = e.target.style;

        const targetWidth = e.target.clientWidth;
        const targetHeight = e.target.clientHeight;

        const marginLeft = Number(targetStyle.getPropertyValue("margin-left").split("px")[0]);
        const marginRight = Number(targetStyle.getPropertyValue("margin-right").split("px")[0]);

        const marginTop = Number(targetStyle.getPropertyValue("margin-top").split("px")[0]);
        const marginBottom = Number(targetStyle.getPropertyValue("margin-bottom").split("px")[0]);

        const width = targetWidth + marginLeft + marginRight;
        const height = targetHeight + marginTop + marginBottom;

        sizeWrapper1.style.width = width + "px";
        sizeWrapper1.style.height = height + "px";
        sizeWrapper1.style.boxShadow = "0px 0px 0px 3px rgba(18,100,163,0.6) inset";

        mouseoverComp = e.target;
      })

      document.getElementById('view')?.addEventListener("click", (e: any) => {
        const targetStyle = e.target.style;

        const targetWidth = e.target.clientWidth;
        const targetHeight = e.target.clientHeight;

        const marginLeft = Number(targetStyle.getPropertyValue("margin-left").split("px")[0]);
        const marginRight = Number(targetStyle.getPropertyValue("margin-right").split("px")[0]);

        const marginTop = Number(targetStyle.getPropertyValue("margin-top").split("px")[0]);
        const marginBottom = Number(targetStyle.getPropertyValue("margin-bottom").split("px")[0]);

        const width = targetWidth + marginLeft + marginRight;
        const height = targetHeight + marginTop + marginBottom;

        sizeWrapper2.style.width = width + "px";
        sizeWrapper2.style.height = height + "px";
        sizeWrapper2.style.boxShadow = "0px 0px 0px 3px rgba(18,100,163,0.8) inset";
        // getStyle(f.target);
        clickedComp = e.target;
      })
      document.getElementById('view')?.parentNode?.childNodes[1].addEventListener("click", () => {
        sizeWrapper1.style.boxShadow = "";
        sizeWrapper2.style.boxShadow = "";
      })
      document.getElementById('view')?.parentNode?.childNodes[1].addEventListener("mouseover", () => {
        if (mouseoverComp !== clickedComp) {
          sizeWrapper1.style.boxShadow = "";
        }
      })
    }
  }, [])

  return (
    <Container id='view'>
      <SizeWrapper id="sizeWrapper1" />
      <SizeWrapper id="sizeWrapper2" />
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