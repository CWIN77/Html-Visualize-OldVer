import styled from 'styled-components'
import { ReactComponent as SVG_search } from '../svgs/search.svg'
import { ReactComponent as SVG_plus } from '../svgs/plus.svg'
import { ReactComponent as SVG_eye } from '../svgs/eye.svg'
import { compData, ableInsert } from '../comps/compData'
import { useStore } from "../zustant"
import { useState } from 'react'
import { ICompData } from "../types"
import kmp from "kmp"
import { useParams } from 'react-router-dom'

const Components = () => {
  const { id } = useParams();
  const developId = id || "history";
  const iconStyles = { fill: "#363636", width: 16, height: 16, style: { padding: 2, marginLeft: 12, cursor: "pointer" } }
  const { selectedComp }: { selectedComp: HTMLElement } = useStore();
  const [compList, setCompList] = useState(compData);
  const [searchText, setSearchText] = useState('');
  const [nameList, setNameList] = useState<String[]>([]);

  const getRandomId = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    let id = ''
    for (let i = 0; i < 4; i++) {
      const randomNum = Math.floor(Math.random() * chars.length)
      id += chars.substring(randomNum, randomNum + 1)
    }
    return id
  }
  const searchComp = (keyword: string) => {
    setSearchText(keyword);
    if (keyword !== "") {
      const newCompList: ICompData[] = [];
      compData.map((data, key) => {
        const text = data.name + " " + data.descript;
        if (kmp(text, keyword) > -1) {
          newCompList.push(compData[key]);
        }
      })
      setCompList(newCompList);
    } else {
      setCompList(compData);
    }
  }

  const addComp = (data: ICompData) => {
    const createElement: HTMLElement = document.createElement("div");
    createElement.insertAdjacentHTML('beforeend', data.comp);
    const newComp = createElement.children[0] as HTMLElement;
    let compName = `comp_${getRandomId()}`;
    while (nameList.indexOf(compName) > -1) {
      compName = `comp_${getRandomId()}`;
    }
    newComp.className = compName;
    setNameList([...nameList, compName]);
    if (selectedComp !== document.body) {
      if (ableInsert.indexOf(selectedComp.tagName.toLowerCase()) > -1) {
        window.alert("선택한 Html에는 Element를 추가할 수 없습니다.")
      } else {
        selectedComp.append(newComp);
        if (document.getElementById("view")?.outerHTML !== undefined) {
          const sHistory: string[] = JSON.parse(sessionStorage.getItem(developId) || JSON.stringify([]));
          sessionStorage.setItem(developId, JSON.stringify([...sHistory, document.getElementById("view")?.outerHTML as string]));
        }
      }
    } else {
      document.getElementById("view")?.append(newComp);
      if (document.getElementById("view")?.outerHTML !== undefined) {
        const sHistory: string[] = JSON.parse(sessionStorage.getItem(developId) || JSON.stringify([]));
        sessionStorage.setItem(developId, JSON.stringify([...sHistory, document.getElementById("view")?.outerHTML as string]));
      }
    }
  }

  return (
    <Container>
      <Name>Components</Name>
      <SearchContainer>
        <SearchInput value={searchText} onChange={(e) => {searchComp(e.target.value);}} type={"text"} placeholder={"Search"} />
        <SearchBtn>
          <SVG_search width={16} height={16} fill={"#E8E8E8"} />
        </SearchBtn>
      </SearchContainer>
      {
        compList.map((data, key) => (
          <Comp key={key}>
            <h1 title={data.descript}>{data.name}</h1>
            <h2>{data.descript}</h2>
            <div>
              <SVG_eye {...iconStyles} />
              <SVG_plus {...iconStyles} onClick={() => { addComp(data) }} />
            </div>
          </Comp>
        ))
      }
    </Container>
  )
}

const Container = styled.div`
  left:0px;
  position: absolute;
  display:flex;
  flex-direction: column;
  overflow-y: auto;
  width:335px;
  height:calc(100vh - 46px);
  background-color: white;
  z-index: 100;
  &::-webkit-scrollbar{
    width:6px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    background-color: rgba(54,54,54,0.4);
  }
`
const Name = styled.h1`
  font-size: 13px;
  padding: 18px 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(54,54,54,0.15);
`
const SearchContainer = styled.div`
  margin: 20px 16px;
  display: flex;
  align-items: center;
  width:calc(100% - 32px);
`
const SearchInput = styled.input`
  width:calc(100% - 28px - 46px);
  background-color: #363636;
  font-size: 13px;
  padding: 0px 16px;
  border-radius: 4px 0px 0px 4px;
  height:40px;
  color:#E8E8E8;
`
const SearchBtn = styled.button`
  display:flex;
  align-items: center;
  justify-content: center;
  background-color:#676767;
  width:46px;
  height:40px;
  border-radius: 0px 4px 4px 0px;
  cursor: pointer;
`
const Comp = styled.div`
  width:calc(100% - 24px - 32px - 4px);
  border: 2px solid rgba(54,54,54,0.4);
  padding : 12px;
  margin: 0px 16px;
  margin-top: 18px;
  margin-bottom: 12px;
  border-radius: 4px;
  display:flex;
  background-color: white;
  flex-direction: column;
  h1{
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    max-height: calc(16px * 2);
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow:ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  h2{
    font-size: 12px;
    line-height: 15px;
    max-height: calc(15px * 4);
    overflow: hidden;
    text-overflow:ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  div{
    display:flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 24px;
  }
`

export default Components