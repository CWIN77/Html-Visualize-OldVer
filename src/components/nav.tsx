// import styled from 'styled-components'
// import { ReactComponent as SvgHome } from '../svgs/home.svg'
// import { ReactComponent as SvgFullScreen } from '../svgs/fullScreen.svg'
// import { ReactComponent as SvgRectangle } from '../svgs/rectangle.svg'
// import { ReactComponent as SvgRectangleFill } from '../svgs/rectangle_fill.svg'
// import { ReactComponent as Svgdesktop } from '../svgs/desktop.svg'
// import { ReactComponent as SVG_phone } from '../svgs/phone.svg'
// import { useEffect, useState } from 'react';
// import Export from './export'

// const Nav = () => {
//   const [isFull, setIsFull] = useState(false);
//   const [device, setDevice] = useState("phone"); // phone / desktop
//   const [zoomLock, setZoomLock] = useState(false);
//   const iconStyle = { width: 22, height: 22, fill: "rgb(200, 200, 200)", style: { padding: 12, backgroundColor: isFull ? "#363636" : "initial", cursor: "pointer" } };
//   const rectangleIcon = { onClick: () => { setZoomLock(!zoomLock) }, width: 22, height: 22, fill: zoomLock ? "white" : "rgb(200, 200, 200)", style: { padding: 6, cursor: "pointer" } };
//   const deviceIcon = { width: 24, height: 24, style: { padding: 8, marginLeft: 2, cursor: "pointer" } };
//   let zoom = 1;

//   const zoomEvent = (e: WheelEvent | Event) => {
//     const zommInput = document.getElementById("zoom") as HTMLInputElement;
//     if (document.getElementById("zoomContainer")?.className.split(" ").at(-1) === "false") {
//       const viewBox = document.getElementById("viewBox") as HTMLInputElement;
//       const target = e.target as HTMLElement | HTMLInputElement;
//       if (target.id && e instanceof WheelEvent) {
//         if (e.deltaY > 0) { // 스크롤 다운
//           if (zoom > 0.1) {
//             zoom -= 0.05;
//             viewBox.style.transform = `scale(${zoom}, ${zoom})`;
//           }
//         } else { // 스크롤 업
//           if (zoom < 1.75) {
//             zoom += 0.05;
//             viewBox.style.transform = `scale(${zoom}, ${zoom})`;
//           }
//         }
//       } else {
//         if (target instanceof HTMLInputElement) {
//           if ((zoom < 1.75 || zoom > 0.1) && Number(target.value) === NaN) {
//             zoom = Number(target.value) / 100;
//             viewBox.style.transform = `scale(${zoom}, ${zoom})`;
//           }
//         }
//       }
//       zommInput.value = String(Math.floor(zoom * 100));
//     } else {
//       zommInput.value = String(Math.floor(zoom * 100));
//     }
//   }

//   useEffect(() => {
//     const viewBg = document.getElementById("viewBackground") as HTMLElement;
//     if (device === "phone") {
//       zoom = viewBg.offsetHeight * 0.87 / 720;
//     } else if (device === "desktop") {
//       zoom = viewBg.offsetWidth * 0.87 / 1395;
//     }
//     const zommInput = document.getElementById("zoom") as HTMLInputElement;
//     zommInput.value = String(Math.floor(zoom * 100));
//     const viewContainerElem = document.getElementById("viewContainer") as HTMLElement;
//     zommInput.addEventListener("change", zoomEvent);
//     viewContainerElem.addEventListener('wheel', zoomEvent);
//   }, [])

//   const changeDevice = (type: string) => {
//     const viewBg = document.getElementById("viewBackground") as HTMLElement;
//     const zommInput = document.getElementById("zoom") as HTMLInputElement;
//     const viewBox = document.getElementById("viewBox") as HTMLElement;
//     const viewContainerElem = document.getElementById("viewContainer") as HTMLElement;
//     if (type === "desktop") {
//       setDevice("desktop");
//       viewBox.style.width = "1395px";
//       viewBox.style.height = "992px";
//       zoom = viewBg.offsetWidth * 0.87 / 1395;
//       viewBox.style.transform = `scale(${zoom}, ${zoom})`;
//     } else if (type === "phone") {
//       setDevice("phone");
//       viewBox.style.width = "360px";
//       viewBox.style.height = "720px";
//       zoom = viewBg.offsetHeight * 0.87 / 720;
//       viewBox.style.transform = `scale(${zoom}, ${zoom})`;
//     }
//     zommInput.value = String(Math.floor(zoom * 100));
//     zommInput.removeEventListener("change", zoomEvent);
//     viewContainerElem.removeEventListener('wheel', zoomEvent);
//     viewContainerElem.addEventListener('wheel', zoomEvent);
//     zommInput.addEventListener("change", zoomEvent);
//   }

//   return (
//     <Container>
//       <SvgHome {...iconStyle} />
//       <ZoomContainer id="zoomContainer" className={String(zoomLock)}>
//         <span>
//           <Svgdesktop fill={device === "desktop" ? "white" : "rgb(200, 200, 200)"} {...deviceIcon} onClick={() => { changeDevice("desktop") }} />
//           <SVG_phone fill={device === "phone" ? "white" : "rgb(200, 200, 200)"} {...deviceIcon} onClick={() => { changeDevice("phone") }} />
//         </span>
//         {
//           zoomLock
//             ? <SvgRectangleFill {...rectangleIcon} />
//             : <SvgRectangle {...rectangleIcon} />
//         }
//         <ZoomInput type={"text"} id="zoom" />
//       </ZoomContainer>
//       <div>
//         <Export />
//         <SvgFullScreen {...iconStyle} onClick={() => {
//           if (isFull) document.exitFullscreen();
//           else document.body.requestFullscreen();
//           setIsFull(!isFull);
//         }} />
//       </div>
//     </Container >
//   )
// }

// const Container = styled.div`
//   width:100vw;
//   height:46px;
//   background-color: #272727;
//   display:flex;
//   align-items: center;
//   justify-content: space-between;
//   div{
//     display:flex;
//     align-items: center;
//   }
// `
// const ZoomContainer = styled.div`
//   display:flex;
//   align-items: center;
//   justify-content: center;
//   position: fixed;
//   left: calc(50vw - (191.91px / 2));
//   padding-left: 4px;
//   span{
//     margin-right: 18px;
//   }
// `
// const ZoomInput = styled.input`
//   color:rgb(255,255,255);
//   width:40px;
//   padding: 8px;
//   padding-left: 4px;
//   font-size: 14px;
// `

// export default Nav



import styled from 'styled-components'
import { ReactComponent as SvgHome } from '../svgs/home.svg'
import { ReactComponent as SvgFullScreen } from '../svgs/fullScreen.svg'
import { ReactComponent as SvgRectangle } from '../svgs/rectangle.svg'
import { ReactComponent as SvgRectangleFill } from '../svgs/rectangle_fill.svg'
import { ReactComponent as SvgDesktop } from '../svgs/desktop.svg'
import { ReactComponent as SvgPhone } from '../svgs/phone.svg'
import { useEffect, useState } from 'react';
import Export from './export'
import { Link } from 'react-router-dom'

const Nav = () => {
  const [isFull, setIsFull] = useState(false);
  const [device, setDevice] = useState("phone"); // phone / desktop
  const [zoomLock, setZoomLock] = useState(false);
  const fullIcon = { width: 22, height: 22, fill: "rgb(200, 200, 200)", style: { padding: 12, backgroundColor: isFull ? "#363636" : "initial", cursor: "pointer" } };
  const homeIcon = { width: 22, height: 22, fill: "rgb(200, 200, 200)", style: { padding: 12, cursor: "pointer" } };
  const rectangleIcon = { onClick: () => { setZoomLock(!zoomLock) }, width: 22, height: 22, fill: zoomLock ? "white" : "rgb(200, 200, 200)", style: { padding: 6, cursor: "pointer" } };
  const deviceIcon = { width: 24, height: 24, style: { padding: 8, marginLeft: 2, cursor: "pointer" } };
  let zoom = 1;

  const zoomEvent = (e: WheelEvent | Event) => {
    const zommInput = document.getElementById("zoom") as HTMLInputElement;
    if (document.getElementById("zoomContainer")?.className.split(" ").at(-1) === "false") {
      const viewBox = document.getElementById("viewBox") as HTMLInputElement;
      const target = e.target as HTMLElement | HTMLInputElement;
      if (target.id && e instanceof WheelEvent) {
        if (e.deltaY > 0) { // 스크롤 다운
          if (zoom > 0.05) {
            zoom -= 0.05;
          }
        } else { // 스크롤 업
          if (zoom < 3) {
            zoom += 0.05;
          }
        }
      } else {
        if (target instanceof HTMLInputElement && Number(target.value) !== NaN) {
          zoom = Number(target.value) / 100;
        }
      }
      viewBox.style.transform = `scale(${zoom}, ${zoom})`;
    }
    zommInput.value = String(Math.floor(zoom * 100));
  }

  useEffect(() => {
    const viewBg = document.getElementById("viewBackground") as HTMLElement;
    const viewBox = document.getElementById("viewBox") as HTMLInputElement;
    if (device === "phone") {
      zoom = viewBg.offsetHeight * 0.9 / 720;
    } else if (device === "desktop") {
      zoom = viewBg.offsetWidth * 0.9 / 1395;
    }
    viewBox.style.transform = `scale(${zoom}, ${zoom})`;
    const zommInput = document.getElementById("zoom") as HTMLInputElement;
    zommInput.value = String(Math.floor(zoom * 100));
    const viewContainerElem = document.getElementById("viewContainer") as HTMLElement;
    zommInput.addEventListener("change", zoomEvent);
    viewContainerElem.addEventListener('wheel', zoomEvent);
  }, [])

  const changeDevice = (type: string) => {
    const viewBg = document.getElementById("viewBackground") as HTMLElement;
    const zommInput = document.getElementById("zoom") as HTMLInputElement;
    const viewBox = document.getElementById("viewBox") as HTMLElement;
    const viewContainerElem = document.getElementById("viewContainer") as HTMLElement;
    if (type === "desktop") {
      setDevice("desktop");
      viewBox.style.width = "1395px";
      viewBox.style.height = "992px";
      zoom = viewBg.offsetWidth * 0.9 / 1395;
      viewBox.style.transform = `scale(${zoom}, ${zoom})`;
    } else if (type === "phone") {
      setDevice("phone");
      viewBox.style.width = "360px";
      viewBox.style.height = "720px";
      zoom = viewBg.offsetHeight * 0.9 / 720;
      viewBox.style.transform = `scale(${zoom}, ${zoom})`;
    }
    zommInput.value = String(Math.floor(zoom * 100));
    zommInput.removeEventListener("change", zoomEvent);
    viewContainerElem.removeEventListener('wheel', zoomEvent);
    viewContainerElem.addEventListener('wheel', zoomEvent);
    zommInput.addEventListener("change", zoomEvent);
  }

  return (
    <Container>
      <Link to="/">
        <SvgHome {...homeIcon} />
      </Link>
      <ZoomContainer id="zoomContainer" className={String(zoomLock)}>
        <span>
          <SvgDesktop fill={device === "desktop" ? "white" : "rgb(200, 200, 200)"} {...deviceIcon} onClick={() => { changeDevice("desktop") }} />
          <SvgPhone fill={device === "phone" ? "white" : "rgb(200, 200, 200)"} {...deviceIcon} onClick={() => { changeDevice("phone") }} />
        </span>
        {
          zoomLock
            ? <SvgRectangleFill {...rectangleIcon} />
            : <SvgRectangle {...rectangleIcon} />
        }
        <ZoomInput type={"text"} id="zoom" />
      </ZoomContainer>
      <div>
        <Export />
        <SvgFullScreen {...fullIcon} onClick={() => {
          if (isFull) document.exitFullscreen();
          else document.body.requestFullscreen();
          setIsFull(!isFull);
        }} />
      </div>
    </Container >
  )
}

const Container = styled.div`
  width:100vw;
  height:46px;
  background-color: #272727;
  display:flex;
  align-items: center;
  justify-content: space-between;
  div{
    display:flex;
    align-items: center;
  }
`
const ZoomContainer = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: calc(50vw - (191.91px / 2));
  padding-left: 4px;
  span{
    margin-right: 18px;
  }
`
const ZoomInput = styled.input`
  color:rgb(255,255,255);
  width:40px;
  padding: 8px;
  padding-left: 4px;
  font-size: 14px;
`

export default Nav