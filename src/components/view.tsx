import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../zustant'

const View = () => {
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
      const sizeWrapper3: any = document.getElementById("sizeWrapper3");
      const sizeWrapper4: any = document.getElementById("sizeWrapper4");
      document.getElementById('view')?.addEventListener("mouseover", (e: any) => {

        if (e.target !== clickedComp) {
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
          sizeWrapper1.style.boxShadow = "0px 0px 0px 1.5px #8bccfb inset";

          sizeWrapper2.style.width = width + "px";
          sizeWrapper2.style.height = height + "px";
          sizeWrapper2.style.boxShadow = "0px 0px 0px 1.5px #8bccfb";

          const scrolledTopLength = window.pageYOffset;
          const absoluteTop = scrolledTopLength + e.target.offsetTop - marginTop;
          sizeWrapper1.style.top = absoluteTop + "px";
          sizeWrapper2.style.top = absoluteTop + "px";
        }
        mouseoverComp = e.target;
      })

      document.getElementById('view')?.addEventListener("click", (e: any) => {
        sizeWrapper1.style.boxShadow = "";
        const targetStyle = e.target.style;

        const targetWidth = e.target.clientWidth;
        const targetHeight = e.target.clientHeight;

        const marginLeft = Number(targetStyle.getPropertyValue("margin-left").split("px")[0]);
        const marginRight = Number(targetStyle.getPropertyValue("margin-right").split("px")[0]);

        const marginTop = Number(targetStyle.getPropertyValue("margin-top").split("px")[0]);
        const marginBottom = Number(targetStyle.getPropertyValue("margin-bottom").split("px")[0]);

        const width = targetWidth + marginLeft + marginRight;
        const height = targetHeight + marginTop + marginBottom;

        sizeWrapper3.style.width = width + "px";
        sizeWrapper3.style.height = height + "px";
        sizeWrapper3.style.boxShadow = "0px 0px 0px 1.5px #0D99FF inset";

        sizeWrapper4.style.width = width + "px";
        sizeWrapper4.style.height = height + "px";
        sizeWrapper4.style.boxShadow = "0px 0px 0px 1.5px #0D99FF";

        const scrolledTopLength = window.pageYOffset;
        const absoluteTop = scrolledTopLength + e.target.offsetTop - marginTop;
        sizeWrapper3.style.top = absoluteTop + "px";
        sizeWrapper4.style.top = absoluteTop + "px";

        // getStyle(f.target);
        // sessionStorage.setItem("selectComp", JSON.stringify(e.target))
        useStore.setState({ selectComp: e.target });
        clickedComp = e.target;
      })
      document.getElementById('view')?.parentNode?.childNodes[1].addEventListener("click", () => {
        sizeWrapper1.style.boxShadow = "";
        sizeWrapper2.style.boxShadow = "";
        sizeWrapper3.style.boxShadow = "";
        sizeWrapper4.style.boxShadow = "";
      })
      document.getElementById('view')?.parentNode?.childNodes[1].addEventListener("mouseover", () => {
        if (mouseoverComp !== clickedComp) {
          sizeWrapper1.style.boxShadow = "";
          sizeWrapper2.style.boxShadow = "";
        }
      })
    }
  }, [])

  return (
    <Container id='view'>
      <SizeWrapper id="sizeWrapper1" />
      <SizeWrapper id="sizeWrapper2" />
      <SizeWrapper id="sizeWrapper3" />
      <SizeWrapper id="sizeWrapper4" />
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