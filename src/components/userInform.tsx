import styled from 'styled-components'
// import { CopyToClipboard } from 'react-copy-to-clipboard'
// import SvgPlus from '../svgs/plus.svg'
import { loginGoogle, logOut, getCurrentUser } from "../firebase/auth";
import { IUser } from '../types';

const UserInform = ({ user }: { user: IUser | null }) => {
  const iconStyles = { fill: "#363636", width: 14, height: 14, style: { padding: 2, cursor: "pointer" } };

  return (
    <Container>
      {
        user
          ? <Profile>
            <ProfileImg src={String(user.img)} />
            <span>
              <ProfileName onClick={() => { logOut() }}>{user.name}</ProfileName>
            </span>
          </Profile>
          : <button onClick={() => { loginGoogle() }}>로그인</button>
      }
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
  width:35px;
  height:35px;
  border-radius: 200px;
  margin-right: 12px;
  cursor: pointer;
`
const ProfileName = styled.h1`
  font-size: 20px;
  width:160px;
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