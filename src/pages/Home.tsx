import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HvList from '../components/Home/HvList';
import { ReactComponent as SvgApps } from "../icons/apps.svg";
import { ReactComponent as SvgFriends } from "../icons/friends.svg";
import { ReactComponent as SvgCommunity } from "../icons/community.svg";
import { getCurrentUser } from '../firebase/auth';
import { IUser } from '../types';

const Home = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const iconStyle = { width: 24, height: 24, fill: "#363636" };

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, [])

  return (
    <Container>
      <TopBar>
        <HvLogo><h2>H</h2>TML<h3>V</h3>isualize</HvLogo>
      </TopBar>
      <div style={{ display: "flex" }}>
        <LeftSideNavBar>
          <HvNav>
            <SvgApps {...iconStyle} />
            <HvNavTitle>My Hv List</HvNavTitle>
          </HvNav>
          <HvNav>
            <SvgFriends {...iconStyle} />
            <HvNavTitle>Friends</HvNavTitle>
          </HvNav>
          <HvNav>
            <SvgCommunity {...iconStyle} />
            <HvNavTitle>Community</HvNavTitle>
          </HvNav>
        </LeftSideNavBar>
        <HvList user={user} />
      </div>
    </Container>
  )
}

const Container = styled.div`
  width:100vw;
  min-height:100vh;
  background-color: #ededed;
  display:flex;
  flex-direction: column;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`
const LeftSideNavBar = styled.div`
  min-height:calc(100vh - 54px - 12px);
  padding-top: 12px;
  min-width: auto;
  background-color: white;
  @media screen and (max-width: 600px) {
    min-width: 100vw;
    min-height:auto;
  }
`
const HvNav = styled.div`
  width:200px;
  display:flex;
  align-items: center;
  padding: 16px 28px;
  margin-top: 8px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    padding: 0px;
    margin-top: 20px;
    margin-bottom: 20px;
    width:auto;
    padding-left: 30px;
  }
`
const HvNavTitle = styled.h1`
  font-size: 17px;
  margin-left: 22px;
  color:#363636;
`
const HvLogo = styled.h1`
  display:flex;
  color:white;
  font-size: 17px;
  padding:16px 28px;
  h2{
    font-size: 17px;
    color:#FC1010;
  }
  h3{
    font-size: 17px;
    color:#08B624;
    margin-left: 6px;
  }
`
const TopBar = styled.header`
  display:flex;
  background-color: #272727;
  height: 54px;
  align-items: center;
`

export default Home;