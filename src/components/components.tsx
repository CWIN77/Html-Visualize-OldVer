import styled from 'styled-components'
import { ReactComponent as SVG_search } from '../svgs/search.svg'
import { ReactComponent as SVG_plus } from '../svgs/plus.svg'
import { ReactComponent as SVG_eye } from '../svgs/eye.svg'
import { compData } from './compData'
import { useStore } from "../zustant"
import { useState } from 'react'
import { ICompData } from "../types"
import kmp from "kmp"

const Components = () => {
  const iconProps = { fill: "#363636", width: 20, height: 20, style: { padding: 2, marginLeft: 12, cursor: "pointer" } }
  const { selectComp }: any = useStore();
  const insertAble = ["img", "input"];
  const [compList, setCompList] = useState(compData);
  const [searchText, setSearchText] = useState('');

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

  return (
    <Container>
      <Name>Components</Name>
      <SearchContainer>
        <SearchInput value={searchText} onChange={(e) => {
          searchComp(e.target.value);
        }} type={"text"} placeholder={"Search"} />
        <SearchBtn>
          <SVG_search width={16} height={16} fill={"#E8E8E8"} />
        </SearchBtn>
      </SearchContainer>
      {
        compList.map((data, key) => (
          <Comp key={key}>
            <h1>{data.name}</h1>
            <h2>{data.descript}</h2>
            <div>
              <SVG_eye {...iconProps} />
              <SVG_plus {...iconProps} onClick={() => {
                if (selectComp && selectComp.id.split('sizeWrapper').length == 1) {
                  if (insertAble.indexOf(selectComp.tagName.toLowerCase()) > -1) {
                    window.alert("선택한 Html에는 Element를 추가할 수 없습니다.")
                  } else {
                    selectComp.insertAdjacentHTML('beforeend', data.comp);
                  }
                } else {
                  document.getElementById("view")?.insertAdjacentHTML('beforeend', data.comp);
                }
              }} />
            </div>
          </Comp>
        ))
      }
    </Container>
  )
}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  overflow-y: auto;
  width:350px;
  height:calc(100vh - 34px);
  background-color: white;
  &::-webkit-scrollbar{
    width:8px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    width: 8px;
    padding: 4px;
    margin: 8px;
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
  width:calc(100% - 28px - 48px);
  background-color: #363636;
  font-size: 14px;
  padding: 0px 14px;
  border-radius: 4px 0px 0px 4px;
  height:42px;
  color:#E8E8E8;
`
const SearchBtn = styled.button`
  display:flex;
  align-items: center;
  justify-content: center;
  background-color:#676767;
  width:48px;
  height:42px;
  border-radius: 0px 4px 4px 0px;
  cursor: pointer;
`
const Comp = styled.div`
  width:calc(100% - 28px - 36px);
  border: 2px solid rgba(54,54,54,0.4);
  padding : 14px 14px;
  margin: 0px 16px;
  margin-top: 24px;
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
    font-size: 13px;
    line-height: 17.5px;
    height: calc(17.5px * 3);
    overflow: hidden;
    text-overflow:ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  div{
    display:flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 12px;
  }
`

export default Components