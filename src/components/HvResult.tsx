import styled from 'styled-components';
import { useStore } from "../stateManager";
import { ReactComponent as SvgClipBoard } from "../svgs/clipBoard.svg";
import { ReactComponent as SvgCross } from "../svgs/cross.svg";
import CopyToClipboard from 'react-copy-to-clipboard';

const HvResult = () => {
  const { hvResult } = useStore();
  const iconStyle = { fill: "white", style: { padding: 4, marginLeft: 14, cursor: "pointer" } }

  if (hvResult !== "") {
    return (
      <Container>
        <ResultBar>
          <h1>Export</h1>
          <span>
            <CopyToClipboard text={String(hvResult)}>
              <SvgClipBoard width={18} height={18} {...iconStyle} />
            </CopyToClipboard>
            <SvgCross onClick={() => useStore.setState({ hvResult: "" })} width={15} height={15} {...iconStyle} />
          </span>
        </ResultBar>
        <ResultText>{hvResult}</ResultText>
      </Container>
    )
  } else {
    return null;
  }
}

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
  padding: 9px 22px;
  background-color: #3d3d3d;
  display:flex;
  align-items: center;
  justify-content: space-between;
  h1{
    color:white;
    font-size: 15px;
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
  padding: 20px 22px;
  font-size: 13px;
  background-color: #242424;
  color:white;
  box-shadow: 0 0 0 1.5px #3d3d3d inset;
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

export default HvResult;
