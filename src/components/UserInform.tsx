import styled from 'styled-components'
import { ReactComponent as SvgGoogleIcon } from '../icons/googleIcon.svg';
import { loginGoogle, logOut } from "../firebase/auth";
import { IUser } from '../types';

const UserInform = ({ user }: { user: IUser | null }) => {
  return (
    <Container>
      {
        user
          ? <Profile>
            <ProfileImg src={String(user.img)} />
            <ProfileName onClick={() => { logOut() }}>{user.name}</ProfileName>
          </Profile>
          : <Profile>
            <SvgGoogleIcon width={32} height={32} style={{ marginRight: 12 }} />
            <ProfileName onClick={() => { loginGoogle() }}>구글 로그인</ProfileName>
          </Profile>
      }
    </Container>
  )
}

const Container = styled.div`
  min-height:calc(100vh - 46px);
  background-color: white;
`
const Profile = styled.div`
  width:186px;
  display:flex;
  align-items: center;
  padding: 22px;
  margin-bottom: 24px;
  margin-top: 12px;
  cursor: pointer;
`
const ProfileImg = styled.img`
  width:32px;
  height:32px;
  border-radius: 200px;
  margin-right: 12px;
  cursor: pointer;
`
const ProfileName = styled.h1`
  font-size: 18px;
  display:flex;
  word-break:break-all;
`

export default UserInform;
