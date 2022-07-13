import styled from 'styled-components'
import { ReactComponent as SVG_home } from '../svgs/home.svg'
import { ReactComponent as SVG_fullScreen } from '../svgs/fullScreen.svg'
import { ReactComponent as SVG_rectangle } from '../svgs/rectangle.svg'
import { ReactComponent as SVG_desktop } from '../svgs/desktop.svg'
import { ReactComponent as SVG_phone } from '../svgs/phone.svg'
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"

const Nav = () => {
  const { pathname } = useLocation();
  const [isFull, setIsFull] = useState(false);
  const [device, setDevice] = useState("phone"); // phone / desktop
  const homeIcon = { width: 22, height: 22, fill: (pathname === "/" ? "rgb(255,255,255)" : "rgb(200,200,200)") };
  const fullScreenIcon = { width: 18, height: 18, fill: (isFull ? "rgb(255,255,255)" : "rgb(200,200,200)") };
  const rectangleIcon = { width: 16, height: 16, fill: "rgb(200, 200, 200)" };
  const deviceIcon = { width: 24, height: 24, style: { padding: 6, marginLeft: 4, cursor: "pointer" } };
  let zoom = 1;

  const zoomEvent = (e: WheelEvent | Event) => {
    const viewBox = document.getElementById("viewBox") as HTMLInputElement;
    const zommInput = document.getElementById("zoom") as HTMLInputElement;
    const target = e.target as HTMLElement | HTMLInputElement;
    if (target.id && e instanceof WheelEvent) {
      if (e.deltaY > 0) { // 스크롤 다운
        if (zoom > 0.1) {
          zoom -= 0.05;
          viewBox.style.transform = `scale(${zoom}, ${zoom})`;
        }
      } else { // 스크롤 업
        if (zoom < 1.75) {
          zoom += 0.05;
          viewBox.style.transform = `scale(${zoom}, ${zoom})`;
        }
      }
    } else {
      if (target instanceof HTMLInputElement) {
        if ((zoom < 1.75 || zoom > 0.1) && Number(target.value) === NaN) {
          zoom = Number(target.value) / 100;
          viewBox.style.transform = `scale(${zoom}, ${zoom})`;
        }
      }
    }
    zommInput.value = String(Math.floor(zoom * 100));
  }

  useEffect(() => {
    if (pathname.substring(0, 8) === "/develop") {
      const zommInput = document.getElementById("zoom") as HTMLInputElement;
      zommInput.value = String(Math.floor(zoom * 100));
      const viewContainerElem = document.getElementById("viewContainer") as HTMLElement;
      viewContainerElem.addEventListener('wheel', zoomEvent);
      zommInput.addEventListener("change", zoomEvent);
    }
  }, [pathname])

  const changeDevice = (type: string) => {
    const zommInput = document.getElementById("zoom") as HTMLInputElement;
    const viewBox = document.getElementById("viewBox") as HTMLElement;
    console.log(type);
    if (type === "desktop") {
      setDevice("desktop");
      viewBox.style.width = "1395px";
      viewBox.style.height = "992px";
      zoom = 0.4;
      viewBox.style.transform = `scale(${zoom}, ${zoom})`;
    } else if (type === "phone") {
      setDevice("phone");
      viewBox.style.width = "360px";
      viewBox.style.height = "720px";
      zoom = 1;
      viewBox.style.transform = `scale(${zoom}, ${zoom})`;
    }
    zommInput.value = String(Math.floor(zoom * 100));
  }

  return (
    <Container>
      <Link to="/" style={{ backgroundColor: pathname === "/" ? "#363636" : "initial" }}>
        <SVG_home {...homeIcon} />
      </Link>
      {
        pathname.substring(0, 8) === "/develop" &&
        <ZoomContainer>
          <span>
            <SVG_desktop fill={device === "desktop" ? "white" : "rgb(200, 200, 200)"} {...deviceIcon} onClick={() => { changeDevice("desktop") }} />
            <SVG_phone fill={device === "phone" ? "white" : "rgb(200, 200, 200)"} {...deviceIcon} onClick={() => { changeDevice("phone") }} />
          </span>
          <SVG_rectangle {...rectangleIcon} />
          <Zoom type={"text"} id="zoom" />
        </ZoomContainer>
      }
      <div style={{ backgroundColor: isFull ? "#363636" : "initial" }} onClick={() => {
        if (isFull) document.exitFullscreen();
        else document.body.requestFullscreen();
        setIsFull(!isFull);
      }}>
        <SVG_fullScreen {...fullScreenIcon} />
      </div>
    </Container>
  )
}

const Container = styled.div`
  width:100vw;
  height:46px;
  background-color: #272727;
  display:flex;
  align-items: center;
  justify-content: space-between;
  a,div{
    width:36px;
    height:36px;
    display:flex;
    align-items: center;
    justify-content: center;
    padding:5px;
    cursor: pointer;
  }
`
const ZoomContainer = styled.span`
  display:flex;
  align-items: center;
  justify-content: center;
  span{
    margin-right: 28px;
  }
`
const Zoom = styled.input`
  color:rgb(255,255,255);
  width:50px;
  padding: 10px;
  font-size: 14px;
`

export default Nav
