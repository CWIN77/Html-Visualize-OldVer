import styled from 'styled-components'
import { ReactComponent as SvgPlus } from '../svgs/plus.svg'
import { Link } from 'react-router-dom';

const DevelopList = () => {
  const iconStyles = { width: 24, height: 24, fill: "#FFFFFF" }
  return (
    <Container>
      <Delveop>
        <div><SvgPlus {...iconStyles} /></div>
        <h1>새로운 프로젝트를 시작해보세요!</h1>
      </Delveop>
      <Link to="/develop/id">
        <Delveop>
          <div>

          </div>
          <h1>테스트용 이름, 테스트용 이름</h1>
        </Delveop>
      </Link>
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
  border-radius: 0px 0px 4px 4px;
  div{
    display:flex;
    align-items: center;
    justify-content: center;
    width:calc(((100vw - 296px) / 2) - 48px);
    height:calc((((100vw - 296px) / 2) - 48px) / 3 * 2);
    background-color: #888888;
    border-radius: 4px 4px 0px 0px;
  }
  h1{
    font-size: 12px;
    width: calc(100% - 24px);
    padding:12px;
  }
`

export default DevelopList
