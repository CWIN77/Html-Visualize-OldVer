import styled from 'styled-components'
import SvgPlus from '../svgs/plus.svg'
import Link from 'next/link'
import { API } from 'aws-amplify';
import { listHvData } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { IHvData } from '../types';

const HvList = () => {
  const iconStyles = { width: 24, height: 24, fill: "#FFFFFF" };
  const [hvList, setHvList] = useState<IHvData[] | null>(null);
  
  const getHvDataList = async () => {
    const { data }: any = await API.graphql({
      query: listHvData,
      variables: {
        filter: { author: { contains: "01" } }
      }
    })
    setHvList(data.listHvData.items);
  }

  useEffect(() => {
    getHvDataList();
  }, [])

  return (
    <Container>
      <Delveop>
        <div><SvgPlus {...iconStyles} /></div>
        <h1>새로운 프로젝트를 시작해보세요!</h1>
      </Delveop>
      {
        hvList && hvList.map((data, key) => (
          <Link key={key} href={`/develop/${data.id}`}>
            <a>
              <Delveop>
                <div>
                  {data.html}
                </div>
                <h1>{data.title}</h1>
              </Delveop>
            </a>
          </Link>
        ))
      }
    </Container>
  )
}

const Container = styled.div`
  display:flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width:100%;
  min-height: 100vh;
  background-color: initial;
`
const Delveop = styled.div`
  margin: 24px;
  background-color: white;
  cursor: pointer;
  border-radius: 0px 0px 2px 2px;
  div{
    display:flex;
    align-items: center;
    justify-content: center;
    width:calc(((100vw - 296px) / 2) - 48px);
    height:calc((((100vw - 296px) / 2) - 48px) / 3 * 2);
    background-color: #888888;
    border-radius: 2px 2px 0px 0px;
  }
  h1{
    font-size: 12px;
    width: calc(100% - 24px);
    padding:12px;
  }
`
export default HvList;