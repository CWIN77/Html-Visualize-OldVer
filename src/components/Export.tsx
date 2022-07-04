import styled from 'styled-components'
import { useStore } from "../zustant"
import { compAttribute, ableInsert } from "../comps/compData"

const Export = () => {
  const { selectedComp }: { selectedComp: HTMLElement } = useStore();
  let countComp = 0;
  let compNames: string[] = [];

  const getRandomId = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    let uid = ''
    for (let i = 0; i < 4; i++) {
      const randomNum = Math.floor(Math.random() * chars.length)
      uid += chars.substring(randomNum, randomNum + 1)
    }
    return uid
  }

  const getAppCode = (comp: HTMLElement) => {
    countComp = 0;
    compNames = [];

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
    let compName = `${comp.id.charAt(0).toUpperCase() + comp.id.slice(1)}_${getRandomId()}`;
    while (compNames.indexOf(compName) > -1) {
      compName = `${comp.id.charAt(0).toUpperCase() + comp.id.slice(1)}_${getRandomId()}`;
    }
    compNames.push(compName);

    let htmlComp: string = "";
    const declareComp: string[] = [];

    if (!(comp.id && comp.id !== "")) {
      countComp++;
    }

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
    <Container onClick={() => { getAppCode(selectedComp) }}>
      HTML Export
    </Container>
  )
}

const Container = styled.button`
  background-color: #1264A3;
  padding:12px;
  margin: 20px;
  font-size: 16px;
  color:white;
  border-radius: 4px;
  cursor: pointer;
`

export default Export