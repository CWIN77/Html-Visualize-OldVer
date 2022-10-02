import styled from 'styled-components'
import { ReactComponent as SvgHome } from '../../icons/home.svg';
import { ReactComponent as SvgFullScreen } from '../../icons/fullScreen.svg';
import { ReactComponent as SvgRectangle } from '../../icons/rectangle.svg';
import { ReactComponent as SvgRectangleFill } from '../../icons/rectangle_fill.svg';
import { ReactComponent as SvgDesktop } from '../../icons/desktop.svg';
import { ReactComponent as SvgPhone } from '../../icons/phone.svg';
import { ReactComponent as SvgTrash } from '../../icons/trash.svg';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IHvData } from '../../types';
import { API } from 'aws-amplify';
import { deleteHvData, updateHvData } from "../../graphql/mutations";
import { getCurrentUser } from '../../firebase/auth';

const TopBar = ({ hvData }: { hvData: IHvData }) => {
  const [isFull, setIsFull] = useState(false);
  const [device, setDevice] = useState("phone"); // phone / desktop
  const [zoomLock, setZoomLock] = useState(false);
  const [hvTitle, setHvTitle] = useState(hvData.title);
  const rectangleIcon = { onClick: () => { setZoomLock(!zoomLock) }, width: 24, height: 24, fill: zoomLock ? "white" : "rgb(200, 200, 200)", style: { padding: 6, cursor: "pointer" } };
  const deviceIcon = { width: 24, height: 24, style: { padding: 8, marginLeft: 2, cursor: "pointer" } };
  let zoom = 1;
  const navigate = useNavigate();

  const zoomEvent = (e: WheelEvent | Event) => {
    const viewBox = document.getElementById("viewBox") as HTMLInputElement;
    const zommInput = document.getElementById("zoom") as HTMLInputElement;
    if (document.getElementById("zoomContainer")?.className.split(" ").at(-1) === "false") {
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
    function isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    if (!isMobile()) {
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
    } else if (viewBox && zommInput) {
      viewBox.style.transform = `scale(0.7, 0.7)`;
      zommInput.value = String(Math.floor(0.7 * 100));
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
        result.then(({ data }: { data: { deleteHvData: IHvData } }) => {
          if (data && data.deleteHvData) {
            navigate("/");
          } else {
            console.error("HV 삭제 실패");
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
          <SvgHome width={24} height={24} fill={"rgb(191, 191, 191)"} style={{ padding: 12, cursor: "pointer" }} />
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
      <Settings>
        <SvgTrash width={22} height={22} fill={"rgb(238, 238, 238)"} style={{ padding: 12, marginLeft: 4, cursor: "pointer" }} onClick={deleteHv} />
        <SvgFullScreen width={22} height={24} fill={"rgb(238, 238, 238)"} style={{ padding: 12, marginLeft: 4, backgroundColor: isFull ? "#424242" : "initial", cursor: "pointer" }} onClick={() => {
          if (isFull) document.exitFullscreen();
          else document.body.requestFullscreen();
          setIsFull(!isFull);
        }} />
      </Settings>
    </Container >
  )
}

const Container = styled.div`
  width:calc(100vw - 10px);
  height:52px;
  padding: 0px 5px;
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
  *{
    @media screen and (max-width: 750px) {
      display:none;
    }
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
const Settings = styled.div`
  *{
    @media screen and (max-width: 750px) {
      display:none;
    }
  }
`

export default TopBar;
