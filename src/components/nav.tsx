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
  const homeIcon = { width: 22, height: 22, fill: (pathname === "/" ? "rgb(255,255,255)" : "rgb(200,200,200)") };
  const fullScreenIcon = { width: 18, height: 18, fill: (isFull ? "rgb(255,255,255)" : "rgb(200,200,200)") };
  const rectangleIcon = { width: 16, height: 16, fill: "rgb(200, 200, 200)" };
  let zoom = 0.75;

  const zoomEvent = (e: WheelEvent | Event) => {
    const viewBox = document.getElementById("viewBox");
    const zommInput = document.getElementById("zoom") as HTMLInputElement;
    const target = e.target as HTMLElement | HTMLInputElement;
    if (target.id && e instanceof WheelEvent) {
      if (e.deltaY > 0) { // 스크롤 다운
        if (viewBox !== null) {
          if (zoom > 0.1) {
            zoom -= 0.05;
            viewBox.style.transform = `scale(${zoom}, ${zoom})`;
          }
        }
      } else { // 스크롤 업
        if (viewBox !== null) {
          if (zoom < 1.75) {
            zoom += 0.05;
            viewBox.style.transform = `scale(${zoom}, ${zoom})`;
          }
        }
      }
    } else {
      if (viewBox !== null && target instanceof HTMLInputElement) {
        if (zoom < 1.75 || zoom > 0.1) {
          zoom = (Number(target.value) / 100) - 0.25;
          viewBox.style.transform = `scale(${zoom}, ${zoom})`;
        }
      }
    }
    if (zommInput) {
      zommInput.value = String(Math.floor((zoom + 0.25) * 100));
    }
  }

  useEffect(() => {
    const zommInput = document.getElementById("zoom") as HTMLInputElement;
    if (zommInput) {
      zommInput.value = String(Math.floor((zoom + 0.25) * 100));
    }
    const viewContainerElem = document.getElementById("viewContainer");
    if (viewContainerElem) {
      viewContainerElem.addEventListener('wheel', zoomEvent);
    }
    if (zommInput) {
      zommInput.addEventListener("change", zoomEvent)
    }
  }, [pathname])

  return (
    <Container>
      <Link to="/" style={{ backgroundColor: pathname === "/" ? "#363636" : "initial" }}>
        <SVG_home {...homeIcon} />
      </Link>
      <ZoomContainer>
        <SVG_rectangle {...rectangleIcon} />
        <Zoom type={"text"} id="zoom" />
      </ZoomContainer>
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
`
const Zoom = styled.input`
  color:rgb(255,255,255);
  width:80px;
  padding: 10px;
  font-size: 14px;
`

export default Nav
