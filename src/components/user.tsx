import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ReactComponent as SVG_plus } from '../svgs/plus.svg'

const User = () => {
  const iconProps = { fill: "#363636", width: 14, height: 14, style: { padding: 2, cursor: "pointer" } }
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
      <Friends>
        <FriendTitle>
          <h1>Friend</h1>
          <SVG_plus {...iconProps} />
        </FriendTitle>
      </Friends>
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
  margin-bottom: 28px;
`
const ProfileImg = styled.img`
  width:70px;
  height:70px;
  border-radius: 200px;
  margin-right: 22px;
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

export default User
