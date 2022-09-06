import styled from 'styled-components';
import { useEffect } from 'react';
import { useStore } from "../zustant";
import { ReactComponent as SvgClipBoard } from '../svgs/clipBoard.svg'
import { ReactComponent as SvgCross } from '../svgs/cross.svg'
import CopyToClipboard from 'react-copy-to-clipboard';

const HvResult = () => {
  const { hvResult }: { hvResult: String | null } = useStore();
  const iconStyle = { fill: "white", style: { padding: 4, marginLeft: 14, cursor: "pointer" } }

  if (hvResult !== "") {
    return (
      <Container>
        <ResultBar>
          <h1>Export</h1>
          <span>
            <CopyToClipboard text={String(hvResult)}>
              <SvgClipBoard width={20} height={20} {...iconStyle} />
            </CopyToClipboard>
            <SvgCross onClick={() => useStore.setState({ hvResult: "" })} width={16} height={16} {...iconStyle} />
          </span>
        </ResultBar>
        <ResultText>{hvResult}</ResultText>
      </Container>
    )
  } else {
    return <></>
  }
}
export default HvResult;

const Container = styled.div`
  width:100vw;
  height:100vh;
  z-index:100;
  position: fixed;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ResultBar = styled.span`
  width:80vw;
  max-width: 450px;
  padding: 12px 24px;
  background-color: #282828;
  display:flex;
  align-items: center;
  justify-content: space-between;
  h1{
    color:white;
    font-size: 16px;
  }
  span{
    display:flex;
    align-items: center;
  }
`
const ResultText = styled.pre`
  width:80vw;
  height:80vw;
  max-width: 450px;
  max-height: 400px;
  padding: 20px 24px;
  font-size: 14px;
  background-color: #f5f5f5;
  box-shadow: 0 0 0 2px #282828 inset;
  user-select: text;
  overflow: scroll;
  &::-webkit-scrollbar{
    width:10px;
    height:10px;
  }
  &::-webkit-scrollbar-corner{
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    background-color: rgba(54,54,54,0.4);
  }
`