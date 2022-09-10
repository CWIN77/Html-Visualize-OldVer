import styled from 'styled-components'
import { useEffect, useState } from 'react'

type compType = {
  tab: Number,
  tag: string,
  name: string
}

const CompLayer = () => {
  const [compList, setCompList] = useState<compType[]>([]);

  const getHtmlNodes = (comp: HTMLElement, compList: compType[], tabSize: Number) => {
    if (comp.nodeType !== 3) { // Text
      compList.push({
        tag: comp.tagName.toLowerCase(),
        tab: tabSize,
        name: comp.className
      });
      comp.childNodes.forEach((child) => {
        getHtmlNodes(child as HTMLElement, compList, Number(tabSize) + 1);
      });
    }
    return compList;
  }

  useEffect(() => {
    setCompList(getHtmlNodes(document.getElementById("view") as HTMLElement, [], 0));
  }, [])

  return (
    <Container>
      {
        compList.map((comp) => {
          return (
            <Comp>
              <pre>{`${"     ".repeat(Number(comp.tab))}⚫︎ ${comp.tag} ${comp.name}`}</pre>
            </Comp>
          )
        })
      }

    </Container>
  )
}

const Container = styled.div`
  margin: 20px 16px;
`
const Comp = styled.span`
  pre{
    padding: 8px 4px;
    font-size: 16px;
    &:hover{
      background-color: #d7d7d7;
    }
  }
`

export default CompLayer