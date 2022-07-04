import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../zustant'

const View = () => {
  const [isAddEvent, setIsAddEvent] = useState(false);

  useEffect(() => {
    if (!isAddEvent) {
      setIsAddEvent(true);
      let mouseoverComp = document.body;
      let clickedComp = document.body;
      const sizeWrapper1: HTMLElement = document.getElementById("sizeWrapper1") || document.body;
      const sizeWrapper2: HTMLElement = document.getElementById("sizeWrapper2") || document.body;
      const sizeWrapper3: HTMLElement = document.getElementById("sizeWrapper3") || document.body;
      const sizeWrapper4: HTMLElement = document.getElementById("sizeWrapper4") || document.body;
      
      document.getElementById('view')?.addEventListener("mouseover", ({ target }: { target: EventTarget | null }) => {
        const eventComp = target as HTMLElement;
        if (eventComp !== clickedComp) {
          const targetStyle = eventComp.style;

          const targetWidth = eventComp.clientWidth;
          const targetHeight = eventComp.clientHeight;

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
          sizeWrapper2.style.boxShadow = "0px 0px 0px 2.5px #8bccfb";

          const scrolledTopLength = window.pageYOffset;
          const absoluteTop = scrolledTopLength + eventComp.offsetTop - marginTop;
          sizeWrapper1.style.top = absoluteTop + "px";
          sizeWrapper2.style.top = absoluteTop + "px";
        }
        mouseoverComp = eventComp;
      })

      document.getElementById('view')?.addEventListener("click", ({ target }: { target: EventTarget | null }) => {
        const eventComp = target as HTMLElement;
        sizeWrapper1.style.boxShadow = "";
        sizeWrapper2.style.boxShadow = "";
        const targetStyle = eventComp.style;

        const targetWidth = eventComp.clientWidth;
        const targetHeight = eventComp.clientHeight;

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
        sizeWrapper4.style.boxShadow = "0px 0px 0px 2.5px #0D99FF";

        const scrolledTopLength = window.pageYOffset;
        const absoluteTop = scrolledTopLength + eventComp.offsetTop - marginTop;
        sizeWrapper3.style.top = absoluteTop + "px";
        sizeWrapper4.style.top = absoluteTop + "px";

        useStore.setState({ selectedComp: eventComp });
        clickedComp = eventComp;
      })
      document.getElementById('viewBackground')?.addEventListener("click", () => {
        sizeWrapper1.style.boxShadow = "";
        sizeWrapper2.style.boxShadow = "";
        sizeWrapper3.style.boxShadow = "";
        sizeWrapper4.style.boxShadow = "";
      })
      document.getElementById('viewBackground')?.addEventListener("mouseover", () => {
        if (mouseoverComp !== clickedComp) {
          sizeWrapper1.style.boxShadow = "";
          sizeWrapper2.style.boxShadow = "";
        }
      })
    }
  }, [])

  return (
    <Container>
      <div style={{ width: "100%", height: "100%" }} id='view' />

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