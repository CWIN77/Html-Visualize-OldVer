import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import SvgPlus from '../svgs/plus.svg'

const UserInform = () => {
  const iconStyles = { fill: "#363636", width: 14, height: 14, style: { padding: 2, cursor: "pointer" } }
  return (
    <Container>
      <Profile>
        <ProfileImg src="https://lh3.googleusercontent.com/a-/AOh14GhBIpwktw4iDwX7_dafbrn64O2wNRJbx1hivycj5A=s96-c" />
        <span>
          <ProfileName>CWIN77</ProfileName>
          <CopyToClipboard text={"#2x81Ezi7"}>
            <ProfileId>#2x81Ezi7</ProfileId>
          </CopyToClipboard>
        </span>
      </Profile>
      {/* <Friends>
        <FriendTitle>
          <h1>Friend</h1>
          <SvgPlus {...iconStyles} />
        </FriendTitle>
        <FriendList>
          Tester
        </FriendList>
      </Friends> */}
    </Container>
  )
}

const Container = styled.div`
  width:320px;
  min-height:calc(100vh - 46px);
  background-color: white;
`
const Profile = styled.div`
  display:flex;
  align-items: center;
  padding: 22px;
  margin-bottom: 24px;
  margin-top: 12px;
`
const ProfileImg = styled.img`
  width:70px;
  height:70px;
  border-radius: 200px;
  margin-right: 18px;
`
const ProfileName = styled.h1`
  font-size: 20px;
  width:160px;
  font-weight: bold;
  margin-top: 8px;
`
const ProfileId = styled.h2`
  font-size: 14px;
  margin-top: 6px;
  opacity: 0.6;
  cursor: pointer;
`

const Friends = styled.div`
  display:flex;
  flex-direction: column;
`
const FriendTitle = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding:22px;
  padding-bottom: 11px;
  border-bottom: 2px solid rgba(54,54,54,0.15);
  h1{
    font-size: 13px;
    padding:2px;
  }
`
const FriendList = styled.div`
  width:calc(100% - 28px - 36px);
  display:flex;
  border-radius: 4px;
  margin:18px;
  padding:14px;
  margin-top: 24px;
  background-color: #363636;
  color:rgb(220,220,220);
`
export default UserInform;