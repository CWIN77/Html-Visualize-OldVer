import styled from 'styled-components'

const User = () => {
  return (
    <Container>
      <Profile>
        <ProfileImg src="https://lh3.googleusercontent.com/a-/AOh14GhBIpwktw4iDwX7_dafbrn64O2wNRJbx1hivycj5A=s96-c" />
        <span>
          <ProfileName>CWIN77</ProfileName>
          <ProfileId>#2x81Ezi7</ProfileId>
        </span>
      </Profile>
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
`
const ProfileImg = styled.img`
  width:70px;
  height:70px;
  border-radius: 200px;
  margin-right: 22px;
`
const ProfileName = styled.h1`
  font-size: 22px;
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

export default User
