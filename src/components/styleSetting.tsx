import styled from 'styled-components'
import { useStore } from "../zustant"
import { compAttribute, ableInsert } from "./compData"
// import { ReactComponent as SVG_search } from '../svgs/search.svg'

const StyleSetting = () => {
  const iconProps = { fill: "#363636", width: 18, height: 18, style: { padding: 2, marginLeft: 10, cursor: "pointer" } };
  const { selectedComp }: { selectedComp: HTMLElement } = useStore();
  let countComp: number = 0;

  const getAppCode = (comp: HTMLElement) => {
    const resultGetHtmlStyle = getHtmlStyle(comp, "");
    const htmlComp = resultGetHtmlStyle.htmlComp.replace(/></g, ">\n<");
    let declareString = "";
    resultGetHtmlStyle.declareComp.forEach((t) => {
      declareString += t + "\n";
    });
    const appCode = `
      import styled from 'styled-components'
      const App = () => {
        return (
          ${htmlComp}
        )
      }
      
      ${declareString}

      export default App
    `
    console.log(appCode);
  }

  const getHtmlStyle = (comp: HTMLElement, html: string) => {
    const compName = `Comp${countComp}`;
    countComp++;

    let htmlComp: string = "";
    const declareComp: string[] = [];

    let attribute = "";
    if (compAttribute[comp.tagName.toLowerCase()]) {
      compAttribute[comp.tagName.toLowerCase()].forEach((att) => {
        attribute += ` ${att}="${comp.getAttribute(att)}"`;
      });
    }
    htmlComp += `<${compName}${attribute}${ableInsert.indexOf(comp.tagName.toLowerCase()) > -1 ? " /" : ""}>`;

    const styleString = comp.style.cssText;
    declareComp.push(`const ${compName} = styled.${comp.tagName.toLowerCase()}` + "`" + styleString + "`;");

    if (comp.childNodes.length > 0) {
      comp.childNodes.forEach((comp) => {
        const childComp = comp as HTMLElement;
        const value = getHtmlStyle(childComp, htmlComp);

        declareComp.push(...value.declareComp);
        htmlComp += value.htmlComp;
      });
    }

    if (!(ableInsert.indexOf(comp.tagName.toLowerCase()) > -1)) {
      htmlComp += `</${compName}>`;
    }

    return { declareComp, htmlComp };
  }

  return (
    <Container>
      <Name>Style</Name>
      <div onClick={() => {
        getAppCode(selectedComp);
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