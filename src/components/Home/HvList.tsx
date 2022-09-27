import styled from 'styled-components';
import { ReactComponent as SvgPlus } from "../../icons/plus.svg";
import { API } from 'aws-amplify';
import { listHvData } from '../../graphql/queries';
import { useEffect, useState } from 'react';
import { IHvData, IUser } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { createHvData } from '../../graphql/mutations';
import { getCurrentUser } from '../../firebase/auth';
const UserInformWidth = "256px";

const HvList = ({ user }: { user: IUser | null }) => {
  const iconStyles = { width: 28, height: 28, fill: "#676767" };
  const [hvList, setHvList] = useState<IHvData[] | null>(JSON.parse(sessionStorage.getItem("hvList") || JSON.stringify(null)));
  const navigate = useNavigate();

  const getRandomId = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    let id = '';
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.floor(Math.random() * chars.length);
      id += chars.substring(randomNum, randomNum + 1);
    }
    return id;
  }
  const getHvDataList = async () => {
    const user = getCurrentUser();
    if (user) {
      const { data } = await API.graphql({
        query: listHvData,
        variables: {
          input: { author: { contains: user?.uid } }
        }
      }) as { data: { listHvData: { items: IHvData[] | null } } };
      const result = data.listHvData.items;
      if (result) {
        result.forEach((hv, i) => {
          if (result !== null) {
            result[i].html = String(hv.html.replace(/\\/g, "").replace(/<br>/g, "")).replace(/contenteditable="true"/g, "");
            sessionStorage.setItem(String(hv.id), JSON.stringify(hv));
          }
        });
        sessionStorage.setItem("hvList", JSON.stringify(result));
        setHvList(result);
      } else setHvList(null);
    } else setHvList(null);
  }
  const tempHtml = `<div class=\"App\" style=\"width: 100%; height: 100%; overflow: auto; display: block; background-color: white;\" id=\"view\"></div>`;
  const addHv = async () => {
    if (window.confirm("새 프로젝트를 생성 하시겠습니까?")) {
      const user = getCurrentUser();
      if (user) {
        const result = await API.graphql({
          query: createHvData,
          variables: {
            input: {
              id: getRandomId(),
              html: tempHtml,
              title: "New Hv Project",
              author: user.uid
            }
          }
        }) as { data: { createHvData: IHvData } };
        const data = result.data.createHvData;
        if (data) {
          getHvDataList();
          if (window.confirm("생성 완료!\n새 프로젝트로 이동 하시겠습니까?")) {
            navigate(`/hv/${data.id}`);
          }
        } else alert("오류! 프로젝트 생성 실패!");
      } else alert("로그인이 되어있지 않습니다.");
    }
  }

  useEffect(() => {
    getHvDataList();
  }, [user])

  useEffect(() => {
    hvList?.forEach((hv) => {
      const width = document.getElementById(hv.id + "cont")?.offsetWidth;
      const preview = document.getElementById(String(hv.id));
      if (preview && width) {
        const scale = width / 360 / 3.3;
        preview.style.transform = `scale(${scale},${scale})`;
      }
    });
    window.addEventListener("resize", () => {
      hvList?.forEach((hv) => {
        const width = document.getElementById(hv.id + "cont")?.offsetWidth;
        const preview = document.getElementById(String(hv.id));
        if (preview && width) {
          const scale = width / 360 / 3.3;
          preview.style.transform = `scale(${scale},${scale})`;
        }
      });
    });
  }, [hvList])

  function compare(a: IHvData, b: IHvData) {
    if (a.updatedAt < b.updatedAt) return 1;
    if (a.updatedAt > b.updatedAt) return -1;
    return 0;
  }

  return (
    <Container>
      <Develop num={"1"} onClick={() => { addHv() }}>
        <HvPreviewContainer><SvgPlus {...iconStyles} /></HvPreviewContainer>
        <DevelopTitle>새로운 프로젝트를 시작해보세요!</DevelopTitle>
      </Develop>
      {
        hvList && hvList.sort(compare).map((data, key) => {
          return (
            <Develop key={key} num={String(key % 2)}>
              <Link to={`/hv/${data.id}`}>
                <HvPreviewContainer id={data.id + "cont"}>
                  <HvPreview id={String(data.id)} dangerouslySetInnerHTML={{ __html: String(data.html) }} />
                </HvPreviewContainer>
                <DevelopTitle>{data.title}</DevelopTitle>
              </Link>
            </Develop>
          )
        })
      }
    </Container >
  )
}

const Container = styled.div`
  display:flex;
  flex-wrap:wrap;
  width:100%;
  height:100%;
  padding-bottom: 24px;
  background-color: initial;
`
const HvPreviewContainer = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  background-color: #ededed;
  width:calc(((100vw - ${UserInformWidth}) / 2) - 42px);
  height:calc((((100vw - ${UserInformWidth}) / 2) - 42px) / 3 * 2);
  @media screen and (min-width: 1600px) {
    width:calc(((100vw - ${UserInformWidth}) / 3) - 38px);
    height:calc((((100vw - ${UserInformWidth}) / 3) - 38px) / 3 * 2);
  }
  @media screen and (max-width: 900px) {
    width:calc(((100vw - ${UserInformWidth}) / 1) - 58px);
    height:calc((((100vw - ${UserInformWidth}) / 1) - 58px) / 3 * 2);
  }
  @media screen and (max-width: 600px) {
    width:calc((100vw / 1) - 58px);
    height:calc(((100vw / 1) - 58px) / 3 * 2);
  }
`
const Develop = styled.div<{ num: string }>` // 0은 오른쪽 1은 왼쪽
  margin: 28px;
  margin-right: 0px;
  margin-bottom: 6px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  outline: 2px solid #dadada;
  border-radius: 8px;
`
const DevelopTitle = styled.h1`
  background-color: #fafafa;
  color:black;
  font-size: 14px;
  height:20px;
  padding:10px 16px;
  display:flex;
  align-items: center;
`
const HvPreview = styled.div`
  position: absolute;
  border-radius: 8px;
  z-index: 2;
  width:360px;
  height:720px;
  transform: ${(hv) => {
    const width = document.getElementById(hv.id + "cont")?.offsetWidth;
    if (width) {
      const scale = width / 360 / 3.3;
      return `scale(${scale},${scale})`;
    }
    return null;
  }};
  &::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    background-color: rgba(54,54,54,0.4);
  }
  div{
    &::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: initial;
    }
    &::-webkit-scrollbar-thumb{
      background-color: rgba(54,54,54,0.4);
    }
  }
`

export default HvList;