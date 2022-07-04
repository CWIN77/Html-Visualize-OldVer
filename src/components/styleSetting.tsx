import styled from 'styled-components'
import { useStore } from "../zustant"
import { ReactComponent as SVG_search } from '../svgs/search.svg'

const StyleSetting = () => {
  const iconProps = { fill: "#363636", width: 18, height: 18, style: { padding: 2, marginLeft: 10, cursor: "pointer" } }
  const { selectedComp }: any = useStore();

  const getStyle = (comp: any) => {
    const styleString = comp.style.cssText;
    const compName = "Comp1";
    const newComp = `const ${compName} = styled.${comp.tagName.toLowerCase()}` + "`" + styleString + "`;";
    const newHtml = [`${compName}`, [`${compName}`, [`${compName}`]]];
    console.log(newComp)
  }

  return (
    <Container>
      <Name>Style</Name>
      <div onClick={() => {
        console.log(selectedComp.childNodes.length > 0);
        console.log(selectedComp);
        getStyle(selectedComp);
      }}>결과 얻기</div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 280px;
  height: calc(100vh - 36px);
  background-color: white;
  &::-webkit-scrollbar{
    width: 8px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    width: 8px;
    padding: 4px;
    margin: 8px;
    background-color: rgba(54, 54, 54, 0.4);
  }
`
const Name = styled.h1`
  font-size: 13px;
  padding: 18px 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(54, 54, 54, 0.15);
`

export default StyleSetting