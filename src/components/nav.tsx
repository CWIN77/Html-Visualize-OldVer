import styled from 'styled-components'
import { ReactComponent as SVG_home } from '../svgs/home.svg'
import { ReactComponent as SVG_fullScreen } from '../svgs/fullScreen.svg'
import { Link } from "react-router-dom";
import { useState } from 'react';

const Nav = () => {
  const homeIcon = { width: 22, height: 22, fill: "rgb(210,210,210)" }
  const fullScreenIcon = { width: 18, height: 18, fill: "rgb(210,210,210)" }
  const [isFull, setIsFull] = useState(false);
  return (
    <Container>
      <Link to="/">
        <SVG_home {...homeIcon} />
      </Link>
      <div onClick={() => {
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
  height:44px;
  background-color: #272727;
  display:flex;
  align-items: center;
  justify-content: space-between;
  a,div{
    width:34px;
    height:34px;
    display:flex;
    align-items: center;
    justify-content: center;
    padding:5px;
    margin-left: 2px;
    cursor: pointer;
  }
`

export default Nav
