import styled from 'styled-components'
import { ReactComponent as SVG_home } from '../svgs/home.svg'
import { ReactComponent as SVG_fullScreen } from '../svgs/fullScreen.svg'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useLocation } from "react-router-dom"

const Nav = () => {
  const { pathname } = useLocation();
  const [isFull, setIsFull] = useState(false);
  const homeIcon = { width: 22, height: 22, fill: (pathname === "/" ? "rgb(255,255,255)" : "rgb(200,200,200)") };
  const fullScreenIcon = { width: 18, height: 18, fill: (isFull ? "rgb(255,255,255)" : "rgb(200,200,200)") };

  return (
    <Container>
      <Link to="/" style={{ backgroundColor: pathname === "/" ? "#353535" : "initial" }}>
        <SVG_home {...homeIcon} />
      </Link>
      <div style={{ backgroundColor: isFull ? "#353535" : "initial" }} onClick={() => {
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

export default Nav
