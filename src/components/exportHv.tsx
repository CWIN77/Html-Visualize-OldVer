import styled from 'styled-components'
import { compAttribute, ableInsert } from "../addableComps/compData"

const ExportHv = () => {
  const tempStyle: { name: string, style: string }[] = [];
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

    const appCode = `
import styled from 'styled-components'
${importString}
const ${comp.className.charAt(0).toUpperCase() + comp.className.slice(1)} = () => {
  return (${htmlComp}
  )
}

${declareString}\nexport default ${comp.className.charAt(0).toUpperCase() + comp.className.slice(1)}
`;
    console.log(appCode);
  }

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
          if (att !== "name") attribute += ` ${att}="${comp.getAttribute(att)}"`;
        });
      }

      const styleString = comp.style.cssText
        .replace(/; /g, ";\n  ")
        .replace("box-shadow: rgb(13, 153, 255) 0px 0px 0px 2.5px inset;\n", "")
        .replace("box-shadow: rgb(139, 204, 251) 0px 0px 0px 2.5px inset;\n", "");

      if (tempStyle.filter(e => e.style === styleString).length === 0) {
        tempStyle.push({ name: compName, style: styleString });
        declareComp.push(`const ${compName} = styled.${comp.tagName.toLowerCase()}` + "`\n  " + styleString + "\n`");
      } else {
        compName = tempStyle.filter(e => e.style === styleString)[0].name;
      }

      htmlComp += `\n\t<${compName}${attribute}${ableInsert.indexOf(comp.tagName.toLowerCase()) > -1 ? " /" : ""}>`;

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
        htmlComp += `\n\t</${compName}>`;
      }
      return { declareComp, htmlComp, importArray };
    }
  }

  return (
    <Container onClick={() => { getAppCode(document.getElementById("view") as HTMLElement) }}>HTML Export</Container>
  )
}
export default ExportHv;

const Container = styled.button`
  background-color: #1264A3;
  padding:10px 12px;
  color:white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-right: 16px;
`
