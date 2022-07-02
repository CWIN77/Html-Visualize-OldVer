import styled from 'styled-components'

const C1 = () => {
  const data = {
    placeholder: "Search",
    type: "text",

  }
  return (
    <SearchInput type={"text"} placeholder={"Search"} />
  )
}

const SearchInput = styled.input`
  width:calc(100% - 28px - 48px);
  background-color: #363636;
  font-size: 14px;
  padding: 0px 14px;
  border-radius: 4px 0px 0px 4px;
  color:#E8E8E8;
`

export default C1