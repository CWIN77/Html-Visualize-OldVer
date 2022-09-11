import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useStore } from '../stateManager'
import { useParams } from 'react-router-dom'

type compType = {
  tab: Number,
  tag: string,
  html: HTMLElement
}

const CompLayer = () => {
  const hvId = useParams().id as string;
  const [compList, setCompList] = useState<compType[]>([]);
  const { isChangeComp }: { isChangeComp: boolean } = useStore();

  const getHtmlNodes = (comp: HTMLElement, compList: compType[], tabSize: Number) => {
    if (comp.nodeType !== 3) { // Text
      compList.push({
        tag: comp.tagName.toLowerCase(),
        tab: tabSize,
        html: comp
      });
      comp.childNodes.forEach((child) => {
        getHtmlNodes(child as HTMLElement, compList, Number(tabSize) + 1);
      });
    }
    return compList;
  }

  useEffect(() => {
    if (isChangeComp) {
      useStore.setState({ isChangeComp: false });
      setCompList(getHtmlNodes(document.getElementById("view") as HTMLElement, [], 0));
    }
  }, [isChangeComp])

  return (
    <Container>
      {
        compList.map((comp, key) => (
          <Comp key={key} onClick={() => {
            const storageCompName: string | null = JSON.parse(sessionStorage.getItem(hvId + "selectComp") || JSON.stringify(null));
            const selectComp = storageCompName ? document.querySelector("." + storageCompName) as HTMLElement : document.body;
            if (selectComp !== null) selectComp.style.boxShadow = "";
            comp.html.style.boxShadow = "inset 0px 0px 0px 2.5px #0D99FF";
            sessionStorage.setItem(hvId + "selectComp", JSON.stringify(comp.html.className));
            useStore.setState({ selectedComp: comp.html });
          }} onMouseOver={() => {
            console.log("Mouse Over");
          }}>
            <pre>{`${"     ".repeat(Number(comp.tab))}◾ ${comp.tag} ${comp.html.className}`}</pre>
          </Comp>
        ))
      }
    </Container>
  )
}

const Container = styled.div`
  margin: 20px 16px;
`
const Comp = styled.span`
  pre{
    padding: 6px 4px;
    font-size: 16px;
    &:hover{
      background-color: #d7d7d7;
    }
  }
`

export default CompLayer