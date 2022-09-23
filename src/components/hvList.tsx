import styled from 'styled-components';
import { ReactComponent as SvgPlus } from "../svgs/plus.svg";
import { API } from 'aws-amplify';
import { listHvData } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { IHvData, IUser } from '../types';
import { Link } from 'react-router-dom';
import { createHvData } from '../graphql/mutations';
import { getCurrentUser } from '../firebase/auth';

const HvList = ({ user }: { user: IUser | null }) => {
  const iconStyles = { width: 24, height: 24, fill: "#242424" };
  const [hvList, setHvList] = useState<IHvData[] | null>(null);

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
    const { data } = await API.graphql({
      query: listHvData,
      variables: {
        input: { author: { contains: user?.uid } }
      }
    }) as { data: { listHvData: { items: IHvData[] | null } } };
    const result = data.listHvData.items;
    if (result) {
      result.forEach((hv, i) => {
        if (result !== null) result[i].html = String(hv.html.replace(/\\/g, "").replace(/<br>/g, ""));
      });
      setHvList(result);
    } else {
      setHvList(null);
    }
  }
  const tempHtml = `<div class=\"App\" style=\"width: 100%; height: 100%; overflow: auto; display: block; background-color: white;\" id=\"view\"></div>`;
  const addHv = async () => {
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
      const data = result.data.createHvData
      console.log(data);
    }
  }

  useEffect(() => {
    if (user) getHvDataList();
  }, [user])

  function compare(a: IHvData, b: IHvData) {
    if (a.updatedAt < b.updatedAt) return 1;
    if (a.updatedAt > b.updatedAt) return -1;
    return 0;
  }

  return (
    <Container>
      <AppDevelop onClick={() => { addHv() }}>
        <div><SvgPlus {...iconStyles} /></div>
        <h1>새로운 프로젝트를 시작해보세요!</h1>
      </AppDevelop>
      {
        hvList && hvList.sort(compare).map((data, key) => {
          return (
            <Link key={key} to={`/develop/${data.id}`}>
              <Develop num={String(key % 2)}>
                <HvPreviewContainer>
                  <HvPreview dangerouslySetInnerHTML={{ __html: String(data.html) }} />
                </HvPreviewContainer>
                <DevelopTitle>{data.title}</DevelopTitle>
              </Develop>
            </Link>
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
const AppDevelop = styled.div`
  display: flex;
  flex-direction: column;
  margin: 28px;
  margin-right: 0px;
  margin-bottom: 6px;
  cursor: pointer;
  outline: 2px solid #dedede;
  border-radius: 8px;
  div{
    display:flex;
    align-items: center;
    justify-content: center;
    width:calc(((100vw - 251px) / 2) - 42px);
    height:calc((((100vw - 251px) / 2) - 42px) / 3 * 2);
    background-color: #ffffff;
  }
  h1{
    background-color: #d0d0d0;
    color:black;
    font-size: 13px;
    width:calc(((100vw - 251px) / 2) - 42px - 32px);
    height:20px;
    padding:10px 16px;
    display:flex;
    align-items: center;
  }
`
const Develop = styled.div<{ num: string }>` // 0은 오른쪽 1은 왼쪽
  margin: 28px;
  margin-right: 0px;
  margin-bottom: 6px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  outline: 2px solid #dedede;
  border-radius: 8px;
`
const DevelopTitle = styled.h1`
  background-color: #d0d0d0;
  color:black;
  font-size: 13px;
  width:calc(((100vw - 251px) / 2) - 42px - 32px);
  height:20px;
  padding:10px 16px;
  display:flex;
  align-items: center;
`
const HvPreviewContainer = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  width:calc(((100vw - 251px) / 2) - 42px);
  height:calc((((100vw - 251px) / 2) - 42px) / 3 * 2);
  background-color: #ededed;
`
const HvPreview = styled.div`
  width:360px;
  height:720px;
  position: absolute;
  transform: scale(0.3,0.3);
  border-radius: 8px;
  z-index: 2;
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