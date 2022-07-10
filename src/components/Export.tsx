import styled from 'styled-components'
import { compAttribute, ableInsert } from "../comps/compData"

const Export = () => {
  const getAppCode = (comp: HTMLElement) => {
    const result = getHtmlStyle(comp, []);
    const htmlComp = result?.htmlComp.replace(/></g, ">\n<");
    let declareString = "";
    let importString = "";
    result?.declareComp.forEach((t) => {
      declareString += t + "\n";
    });
    result?.importArray.forEach((s) => {
      importString += `import ${s.charAt(0).toUpperCase() + s.slice(1)} from "./${s.charAt(0).toUpperCase() + s.slice(1)}"\n`
    })

    const appCode = `import styled from 'styled-components'
${importString}
const ${comp.className.charAt(0).toUpperCase() + comp.className.slice(1)} = () => {
  return (
    ${htmlComp}
  )
}

${declareString}\nexport default ${comp.className.charAt(0).toUpperCase() + comp.className.slice(1)}
`;
    console.log(appCode);
  }

  // let compName = `${comp.id.charAt(0).toUpperCase() + comp.id.slice(1)}_${getRandomId()}`;
  // while (compNames.indexOf(compName) > -1) {
  //   compName = `${comp.id.charAt(0).toUpperCase() + comp.id.slice(1)}_${getRandomId()}`;
  // }

  const getHtmlStyle = (comp: HTMLElement, importString: string[]) => {
    if (comp.className) {
      let compName = "";
      if (comp.getAttribute("divide") === "true" || comp.id === "view") {
        compName = "Container";
      } else {
        compName = `${comp.className.charAt(0).toUpperCase() + comp.className.slice(1)}`;
      }
      let htmlComp: string = "";
      const declareComp: string[] = [];

      let attribute = "";
      if (compAttribute[comp.tagName.toLowerCase()]) {
        compAttribute[comp.tagName.toLowerCase()].forEach((att) => {
          attribute += ` ${att}="${comp.getAttribute(att)}"`;
        });
      }
      htmlComp += `<${compName}${attribute}${ableInsert.indexOf(comp.tagName.toLowerCase()) > -1 ? " /" : ""}>`;
      const styleString = comp.style.cssText
        .replace(/;/g, ";\n")
        .replace("box-shadow: rgb(13, 153, 255) 0px 0px 0px 2.5px inset;\n", "")
        .replace("box-shadow: rgb(139, 204, 251) 0px 0px 0px 2.5px inset;\n", "");
      declareComp.push(`const ${compName} = styled.${comp.tagName.toLowerCase()}` + "`\n" + styleString + "`");

      const importArray: string[] = importString;
      if (comp.childNodes.length > 0) {
        comp.childNodes.forEach((childComp) => {
          const comp = childComp as HTMLElement;
          if (comp.nodeType === 3) {
            htmlComp += comp.textContent;
          } else {
            if (comp.getAttribute("divide") === "true") {
              getAppCode(comp);
              htmlComp += `<${comp.className} />`
              importArray.push(comp.className);
            } else {
              const value = getHtmlStyle(comp, importArray);
              if (value) {
                declareComp.push(...value.declareComp);
                htmlComp += value.htmlComp;
              }
            }
          }
        });
      }

      if (!(ableInsert.indexOf(comp.tagName.toLowerCase()) > -1)) {
        htmlComp += `</${compName}>`;
      }
      return { declareComp, htmlComp, importArray };
    }
  }

  return (
    <Container onClick={() => { getAppCode(document.getElementById("view") as HTMLElement) }}>
      HTML Export
    </Container>
  )
}

const Container = styled.button`
  background-color: #1264A3;
  padding:14px;
  margin: 24px 48px;
  font-size: 14px;
  color:white;
  border-radius: 4px;
  cursor: pointer;
`

export default Export