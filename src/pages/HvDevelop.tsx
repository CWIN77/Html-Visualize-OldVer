import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHvData } from "../graphql/queries";
import { API } from 'aws-amplify';
import { IHvData } from '../types';
import HvResult from "../components/HvResult";
import StyleSet from "../components/StyleSet";
import LeftSideBar from "../components/LeftSideBar";
import NavBar from "../components/NavBar";
import HvView from "../components/HvView";

const HvDevelop = () => {
  const hvId = useParams().id || JSON.parse(sessionStorage.getItem("hvId") || JSON.stringify(null));
  const [hvData, setHvData] = useState<String | null>(null);

  const setHvDataFromAmplify = async () => {
    const { data } = await API.graphql({
      query: getHvData,
      variables: {
        id: hvId
      }
    }) as { data: { getHvData: IHvData | null } };
    const hvData: IHvData | null = data.getHvData;
    // if (hvData) console.log(String(hvData.html.replace(/\\/g, "").replace(/\\/g, "")));
    if (hvData) setHvData(String(hvData.html.replace(/\\/g, "").replace(/\\/g, "")));
    else setHvData(null);
  }

  useEffect(() => {
    sessionStorage.removeItem(hvId + "selectComp");
    setHvDataFromAmplify();
  }, [])

  if (hvData) {
    return (
      <>
        <HvResult />
        <NavBar />
        <Container>
          <LeftSideBar />
          <HvView hvHtml={hvData} />
          <StyleSet />
        </Container>
      </>
    )
  } else {
    return (
      <div>
        존재하지 않는 페이지 입니다.
      </div>
    )
  }
}

const Container = styled.div`
  width:100%;
  min-height:100%;
  display:flex;
`

export default HvDevelop;