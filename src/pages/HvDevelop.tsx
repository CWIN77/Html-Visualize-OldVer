import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHvData } from "../graphql/queries";
import { API } from 'aws-amplify';
import { IHvData } from '../types';
import HvResult from "../components/hvResult";
import StyleSet from "../components/styleSet";
import LeftSideBar from "../components/leftSideBar";
import NavBar from "../components/navBar";
import HvView from "../components/hvView";

const HvDevelop = () => {
  const hvId = useParams().id || JSON.parse(sessionStorage.getItem("hvId") || JSON.stringify(null));
  const [hvData, setHvData] = useState('');
  const getHvDataFromAmplify = async () => {
    const { data } = await API.graphql({
      query: getHvData,
      variables: {
        id: hvId
      }
    }) as { data: { getHvData: IHvData } };
    const hvData: IHvData = data.getHvData;
    setHvData(String(hvData.html));
  }

  useEffect(() => {
    sessionStorage.removeItem(hvId + "selectComp");
    getHvDataFromAmplify();
  }, [])

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
}

const Container = styled.div`
  width:100%;
  min-height:100%;
  display:flex;
`

export default HvDevelop;