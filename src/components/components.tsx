import styled from 'styled-components'
import { ReactComponent as SVG_search } from '../svgs/search.svg'
import { ReactComponent as SVG_plus } from '../svgs/plus.svg'
import { ReactComponent as SVG_eye } from '../svgs/eye.svg'

const Components = () => {
  const iconProps = { fill: "#363636", width: 20, height: 20, style: { padding: 2, marginLeft: 12, cursor: "pointer" } }
  return (
    <Container>
      <Name>Components</Name>
      <SearchContainer>
        <SearchInput type={"text"} placeholder={"Search"} />
        <SearchBtn>
          <SVG_search width={16} height={16} fill={"#E8E8E8"} />
        </SearchBtn>
      </SearchContainer>
      <Comp>
        <h1>문자 입력칸</h1>
        <h2>문자를 입력 할 수 있는 칸을 추가합니다.</h2>
        <div>
          <SVG_eye {...iconProps} />
          <SVG_plus {...iconProps} />
        </div>
      </Comp>
      <div>
        <button >설정값 바꾸기</button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  overflow-y: auto;
  width:350px;
  height:100vh;
  background-color: white;
  &::-webkit-scrollbar{
    width:8px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    width: 8px;
    padding: 4px;
    margin: 8px;
    background-color: rgba(54,54,54,0.4);
  }
`
const Name = styled.h1`
  font-size: 13px;
  padding: 18px 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(54,54,54,0.15);
`
const SearchContainer = styled.div`
  margin: 20px 16px;
  display: flex;
  align-items: center;
  width:calc(100% - 32px);
`
const SearchInput = styled.input`
  width:calc(100% - 28px - 48px);
  background-color: #363636;
  font-size: 14px;
  padding: 0px 14px;
  border-radius: 4px 0px 0px 4px;
  height:42px;
  color:#E8E8E8;
`
const SearchBtn = styled.button`
  display:flex;
  align-items: center;
  justify-content: center;
  background-color:#676767;
  width:48px;
  height:42px;
  border-radius: 0px 4px 4px 0px;
  cursor: pointer;
`
const Comp = styled.div`
  width:calc(100% - 28px - 36px);
  border: 2px solid rgba(54,54,54,0.4);
  padding : 14px 14px;
  margin: 0px 16px;
  margin-top: 24px;
  margin-bottom: 12px;
  border-radius: 4px;
  display:flex;
  background-color: white;
  flex-direction: column;
  h1{
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    max-height: calc(16px * 2);
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow:ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  h2{
    font-size: 13px;
    line-height: 17.5px;
    height: calc(17.5px * 3);
    overflow: hidden;
    text-overflow:ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  div{
    display:flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 12px;
  }
`

export default Components