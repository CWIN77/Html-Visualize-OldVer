import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { changeHvStorage, getSelectComp, useStore } from '../stateManager'
import { useParams } from 'react-router-dom'
import { ReactComponent as SvgShapes } from '../svgs/shapes.svg'
import { ReactComponent as SvgText } from '../svgs/text.svg'

type compType = {
  tab: Number,
  tag: string,
  html: HTMLElement
}
type textType = {
  tab: Number,
  parent: HTMLElement,
  html: HTMLElement
}

const CompLayer = () => {
  const hvId = useParams().id as string;
  const [compList, setCompList] = useState<(compType | textType)[]>([]);
  const { isChangeComp }: { isChangeComp: boolean } = useStore();
  const iconStyle = { width: 18, height: 18, fill: "#282828", style: { marginRight: 4 } };
  // const [mouseoverComp, setMouseoverComp] = useState<HTMLElement | null>(null);

  const getHtmlNodes = (comp: HTMLElement, compList: (compType | textType)[], tabSize: Number) => {
    if (comp.nodeType === 3) {
      compList.push({
        tab: tabSize,
        parent: comp.parentElement as HTMLElement,
        html: comp
      });
    } else {
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
      setCompList(getHtmlNodes(document.getElementById("view") as HTMLElement, [], 0));
    }
  }, [isChangeComp])

  useEffect(() => {
    setCompList(getHtmlNodes(document.getElementById("view") as HTMLElement, [], 0));
  }, [])

  useEffect(() => {
    compList.forEach((comp) => {
      if (!("tag" in comp)) {
        const inputComp = document.getElementById(comp.parent.className) as HTMLInputElement;
        inputComp.value = comp.html.textContent as string;
      }
    });
  }, [compList])

  return (
    <Container>
      {
        compList.map((comp, key) => {
          const selectComp = getSelectComp(hvId);
          if ("tag" in comp) {
            return (
              <Comp isSelect={String(selectComp === comp.html)} key={key} onClick={() => {
                selectComp.style.boxShadow = "";
                comp.html.style.boxShadow = "inset 0px 0px 0px 2.5px #0D99FF";
                sessionStorage.setItem(hvId + "selectComp", JSON.stringify(comp.html.className));
              }}>
                <pre>{`${"     ".repeat(Number(comp.tab))}`}</pre>
                <SvgShapes {...iconStyle} />
                <pre>{comp.tag} {comp.html.className}</pre>
              </Comp>
            )
          } else {
            return (
              <Comp isSelect={"text"} key={key}>
                <pre>{`${"     ".repeat(Number(comp.tab))}`}</pre>
                <SvgText {...iconStyle} />
                <input id={comp.parent.className} onChange={(e: any) => {
                  comp.html.textContent = e.target.value;
                  changeHvStorage(hvId);
                }} />
              </Comp>
            )
          }
        })
      }
    </Container>
  )
}

const Container = styled.div`
  margin: 20px 12px;
`
const Comp = styled.span<{ isSelect: String }>`
  display:flex;
  align-items: center;
  pre,input{
    padding: 6px 4px;
    font-size: 16px;
  }
  background-color: ${props => props.isSelect === "true" ? "#8dd0ff" : "initial"};
  &:hover{
    box-shadow: ${props => props.isSelect !== "text" ? "inset 0px 0px 0px 2px #8dd0ff" : ""};
  }
`

export default CompLayer