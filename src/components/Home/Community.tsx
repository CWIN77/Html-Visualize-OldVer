import styled from 'styled-components';
const leftBarSize = "233px";

const Community = () => {
  return (
    <Container>
      
    </Container>
  )
}

const Container = styled.div`
  display:flex;
  flex-wrap:wrap;
  width:100%;
  height:100%;
  padding-bottom: 24px;
  background-color: initial;
  margin-top: 52px;
  margin-left: ${leftBarSize};
  @media screen and (max-width: 600px) {
    margin-left: 70px;
  }
`

export default Community;