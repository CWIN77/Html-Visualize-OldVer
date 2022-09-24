import styled from 'styled-components'
import { ReactComponent as SvgHome } from '../svgs/home.svg';
import { ReactComponent as SvgFullScreen } from '../svgs/fullScreen.svg';
import { ReactComponent as SvgRectangle } from '../svgs/rectangle.svg';
import { ReactComponent as SvgRectangleFill } from '../svgs/rectangle_fill.svg';
import { ReactComponent as SvgDesktop } from '../svgs/desktop.svg';
import { ReactComponent as SvgPhone } from '../svgs/phone.svg';
import { ReactComponent as SvgSetting } from '../svgs/setting.svg';
import { ReactComponent as SvgList } from '../svgs/list.svg';
import { useEffect, useState } from 'react';
import HvExport from './HvExport';
import { Link } from 'react-router-dom';
import { IHvData } from '../types';
import { API } from 'aws-amplify';
import { deleteHvData, updateHvData } from "../graphql/mutations";
import { getCurrentUser } from '../firebase/auth';

const NavBar = ({ hvData }: { hvData: IHvData }) => {
  const [isFull, setIsFull] = useState(false);
  const [device, setDevice] = useState("phone"); // phone / desktop
  const [zoomLock, setZoomLock] = useState(false);
  const [hvTitle, setHvTitle] = useState(hvData.title);
  const iconStyle = { width: 19, height: 19, fill: "rgb(255, 255, 255)" };
  const fullIcon = { ...iconStyle, style: { padding: 12, backgroundColor: isFull ? "#424242" : "initial", cursor: "pointer" } };
  const homeIcon = { ...iconStyle, style: { padding: 12, cursor: "pointer" } };
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
        if (target instanceof HTMLInputElement) {
          zoom = Number(target.value) / 100;
        }
      }
      viewBox.style.transform = `scale(${zoom}, ${zoom})`;
    }
    zommInput.value = String(Math.floor(zoom * 100));
  }

  useEffect(() => {
    const viewBg = document.getElementById("viewBackground") as HTMLElement;
    const viewBox = document.getElementById("viewBox");
    const zommInput = document.getElementById("zoom") as HTMLInputElement | null;
    const viewContainerElem = document.getElementById("viewContainer");

    if (viewBg && viewBox && zommInput && viewContainerElem) {
      if (device === "phone") {
        zoom = viewBg.offsetHeight * 0.9 / 720;
      } else if (device === "desktop") {
        zoom = viewBg.offsetWidth * 0.9 / 1395;
      }
      viewBox.style.transform = `scale(${zoom}, ${zoom})`;
      zommInput.value = String(Math.floor(zoom * 100));
      zommInput.addEventListener("change", zoomEvent);
      viewContainerElem.addEventListener('wheel', zoomEvent);
    } else {
      const zoomSetter = setInterval(() => {
        const viewBg = document.getElementById("viewBackground") as HTMLElement;
        const viewBox = document.getElementById("viewBox");
        const zommInput = document.getElementById("zoom") as HTMLInputElement | null;
        const viewContainerElem = document.getElementById("viewContainer");
        if (viewBg && viewBox && zommInput && viewContainerElem) {
          if (device === "phone") {
            zoom = viewBg.offsetHeight * 0.9 / 720;
          } else if (device === "desktop") {
            zoom = viewBg.offsetWidth * 0.9 / 1395;
          }
          viewBox.style.transform = `scale(${zoom}, ${zoom})`;
          zommInput.value = String(Math.floor(zoom * 100));
          zommInput.addEventListener("change", zoomEvent);
          viewContainerElem.addEventListener('wheel', zoomEvent);
          clearInterval(zoomSetter);
        }
      }, 100)
    }
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

  const changeHvTitle = () => {
    const user = getCurrentUser();
    if (user?.uid === hvData.author) {
      const result = API.graphql({
        query: updateHvData,
        variables: {
          input: {
            id: hvData.id,
            title: hvTitle
          }
        }
      }) as any;
      result.then(({ data }: { data: { updateHvData: IHvData } }) => {
        if (data && data.updateHvData) {
          console.log("HV 업데이트 성공");
        } else {
          console.error("HV 업데이트 실패");
        }
      });
    } else {
      alert("로그인 되어있지 않습니다.");
    }
  }

  const deleteHv = () => {
    if (window.confirm("프로젝트를 제거 하겠습니까?\n한번 제거한 프로젝트는 되돌리지 못합니다.")) {
      const user = getCurrentUser();
      if (user?.uid === hvData.author) {
        const result = API.graphql({
          query: deleteHvData,
          variables: {
            input: {
              id: hvData.id
            }
          }
        }) as any;
        result.then(({ data }: { data: { updateHvData: IHvData } }) => {
          if (data && data.updateHvData) {
            console.log("HV 업데이트 성공");
          } else {
            console.error("HV 업데이트 실패");
          }
        });
      } else {
        alert("로그인 되어있지 않습니다.");
      }
    }
  }

  return (
    <Container>
      <div>
        <Link to="/">
          <SvgHome {...homeIcon} />
        </Link>
        <HvNameInput
          type={"text"}
          value={String(hvTitle)}
          onBlur={() => { changeHvTitle() }}
          onKeyDown={(e) => { if (e.key === "Enter") changeHvTitle() }}
          onChange={(e) => { setHvTitle(e.target.value) }}
        />
      </div>
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
        <HvExport />
        <SvgSetting {...homeIcon} onClick={() => { }} />
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
  color:white;
  width:40px;
  padding: 8px;
  padding-left: 4px;
  font-size: 14px;
`
const HvNameInput = styled.input`
  color:white;
  font-size: 16px;
  margin-left: 8px;
  width:200px;
  padding: 4px;
`

export default NavBar;