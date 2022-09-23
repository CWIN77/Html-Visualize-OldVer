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
  const iconStyles = { width: 24, height: 24, fill: "#FFFFFF" };
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
      })
    }
    setHvList(result);
  }
  const tempHtml = `<div class=\"App\" style=\"width: 100%; height: 100%; overflow: auto; display: flex; background-color: white;\" id=\"view\"></div>`;
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

  return (
    <Container>
      <AppDelveop onClick={() => { addHv() }}>
        <div><SvgPlus {...iconStyles} /></div>
        <h1>새로운 프로젝트를 시작해보세요!</h1>
      </AppDelveop>
      {
        hvList && hvList.map((data, key) => {
          return (
            <Link key={key} to={`/develop/${data.id}`}>
              <Delveop num={String(key % 2)}>
                <div>{data.html}</div>
                <h1>{data.title}</h1>
              </Delveop>
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
  background-color: initial;
`
const AppDelveop = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px;
  margin-right: 12px;
  margin-bottom: 0px;
  cursor: pointer;
  border-radius: 0px 0px 2px 2px;
  div{
    display:flex;
    align-items: center;
    justify-content: center;
    width:calc(((100vw - 251px) / 2) - 36px);
    height:calc((((100vw - 251px) / 2) - 36px) / 3 * 2);
    background-color: #888888;
    border-radius: 2px 2px 0px 0px;
  }
  h1{
    background-color: white;
    font-size: 13px;
    width:calc(((100vw - 251px) / 2) - 36px - 28px);
    height:17px;
    padding:10px 14px;
    display:flex;
    align-items: center;
  }
`
const Delveop = styled.div<{ num: string }>` // 0은 오른쪽 1은 왼쪽
  margin: 24px;
  margin-left: ${props => props.num === "0" ? "12px" : "24px"};
  margin-right: ${props => props.num === "0" ? "24px" : "12px"};
  margin-bottom: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  div{
    display:flex;
    align-items: center;
    justify-content: center;
    width:calc(((100vw - 251px) / 2) - 36px);
    height:calc((((100vw - 251px) / 2) - 36px) / 3 * 2);
    background-color: #888888;
  }
  h1{
    background-color: white;
    font-size: 13px;
    width:calc(((100vw - 251px) / 2) - 36px - 28px);
    height:17px;
    padding:10px 14px;
    display:flex;
    align-items: center;
  }
`
export default HvList;