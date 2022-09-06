import styled from 'styled-components'
import { compAttribute, ableInsert } from "../addableComps/compData"
import { useStore } from "../zustant";

const ExportHv = () => {
  let tempStyle: { name: string, style: string }[] = [];
  let tabSize = 0;

  const getHtmlCode = (comp: HTMLElement) => {

  }

  const getVueCode = (comp: HTMLElement) => {

  }

  const getReactCode = (comp: HTMLElement) => {
    tabSize = 0;
    tempStyle = [];
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

    const appCode = `import styled from 'styled-components'\n${importString}\nconst ${comp.className.charAt(0).toUpperCase() + comp.className.slice(1)} = () => {\n  return (${htmlComp}\n  )\n}\n${declareString}\nexport default ${comp.className.charAt(0).toUpperCase() + comp.className.slice(1)}\n`;

    return appCode;
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

      htmlComp += `\n    ${"  ".repeat(tabSize)}<${compName}${attribute}${ableInsert.indexOf(comp.tagName.toLowerCase()) > -1 ? " /" : ""}>`;
      tabSize++;
      let isChildText = false;
      const importArray: string[] = importString;
      if (comp.childNodes.length > 0) {
        comp.childNodes.forEach((childComp) => {
          const comp = childComp as HTMLElement;
          if (comp.nodeType === 3) {
            htmlComp += comp.textContent;
            isChildText = true;
          } else {
            if (comp.getAttribute("divide") === "true") {
              getReactCode(comp);
              htmlComp += `\n    ${"  ".repeat(tabSize)}<${comp.className.charAt(0).toUpperCase() + comp.className.slice(1)} />`
              importArray.push(comp.className);
            } else {
              const value = getHtmlStyle(comp, importArray);
              if (value) {
                declareComp.push(...value.declareComp);
                htmlComp += value.htmlComp;
                tabSize--;
              }
            }
          }
        });
      }

      if (!(ableInsert.indexOf(comp.tagName.toLowerCase()) > -1)) {
        if (isChildText) htmlComp += `</${compName}>`;
        else htmlComp += `\n    ${"  ".repeat(tabSize - 1)}</${compName}>`;
      }
      return { declareComp, htmlComp, importArray };
    }
  }

  return (
    <Container onClick={() => {
      const result = getReactCode(document.getElementById("view") as HTMLElement);
      useStore.setState({ hvResult: result });
    }}>Export</Container>
  )
}
export default ExportHv;

const Container = styled.button`
  background-color: #1264A3;
  padding:7px 9px;
  color:white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-right: 12px;
`

