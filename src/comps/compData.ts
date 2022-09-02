import { ICompData } from "../types"
import c0 from "./c0"
import c1 from "./c1"
import c2 from "./c2"
import c3 from "./c3"
import c4 from "./c4"
import c5 from "./c5"
import c6 from "./c6"
import c7 from "./c7"
import c8 from "./c8"
import c9 from "./c9"
import c10 from "./c10"
import c11 from "./c11"
import c12 from "./c12"
import c13 from "./c13"
import c14 from "./c14"
import c15 from "./c15"
import c16 from "./c16"
import c17 from "./c17"
import c18 from "./c18"
import c19 from "./c19"
import c20 from "./c20"
import c21 from "./c21"

export const compData: ICompData[] = [
  {
    id: 0,
    name: "Input (type:text)",
    descript: "input 태그의 요소입니다. 기본 type이 text로 지정되어 있어서 문자를 입력 할 수 있습니다. 개발 단계에서는 기능이 꺼져있습니다.",
    comp: c0
  },
  {
    id: 1,
    name: "Division (div)",
    descript: "div 태그의 요소입니다. 기본 크기는 50px입니다. Block level의 요소이기 때문에 기본적으로 줄 바꿈이 됩니다.",
    comp: c1
  },
  {
    id: 2,
    name: "Header text (h1)",
    descript: "h1 태그의 요소입니다. 기본 font size는 18px입니다. 문자는 더블클릭을 하여 수정할 수 있습니다.",
    comp: c2
  },
  {
    id: 3,
    name: "Anchor (a)",
    descript: "a 태그의 요소입니다. href에 입력된 링크로 이동합니다. 문자는 더블클릭을 하여 수정할 수 있습니다. 개발 단계에서는 기능이 꺼져있습니다.",
    comp: c3
  },
  // {
  //   id: 4,
  //   name: "Span (span)",
  //   descript: "span 태그의 요소입니다. 기본 크기는 50px입니다. Inline level의 요소이기 때문에 기본적으로 줄 바꿈이 안됩니다.",
  //   comp: c4
  // },
  {
    id: 5,
    name: "Image (img)",
    descript: "img 태그의 요소입니다. src에 입력된 소스를 불러옵니다. 기본 가로 길이는 250px이고 height은 auto입니다.",
    comp: c5
  },
  {
    id: 6,
    name: "Paragraph (p)",
    descript: "p 태그의 요소입니다. 문자를 더블클릭으로 수정할 수 있고 앞 뒤로 빈 줄이 생기면서 단락이 생깁니다.",
    comp: c6
  },
  {
    id: 7,
    name: "Component (div)",
    descript: "div 태그의 컴포넌트 분리용 요소입니다. 추후 HTML을 Export해서 받을때 이 요소를 분리해줍니다.",
    comp: c7
  },
  {
    id: 8,
    name: "Header text (h2)",
    descript: "h2 태그의 요소입니다. 기본 font size는 16px입니다. 문자는 더블클릭을 하여 수정할 수 있습니다.",
    comp: c8
  },
  {
    id: 9,
    name: "Header text (h3)",
    descript: "h3 태그의 요소입니다. 기본 font size는 14px입니다. 문자는 더블클릭을 하여 수정할 수 있습니다.",
    comp: c9
  },
  {
    id: 10,
    name: "Header text (h4)",
    descript: "h4 태그의 요소입니다. 기본 font size는 12px입니다. 문자는 더블클릭을 하여 수정할 수 있습니다.",
    comp: c10
  },
  {
    id: 11,
    name: "Header text (h5)",
    descript: "h5 태그의 요소입니다. 기본 font size는 10px입니다. 문자는 더블클릭을 하여 수정할 수 있습니다.",
    comp: c11
  },
  {
    id: 12,
    name: "Listed item (li)",
    descript: `li 태그의 요소입니다. "내용"이라는 글자가 기본으로 들어가있습니다. 주로 ul 혹은 ol 태그의 내부 요소로 사용됩니다.`,
    comp: c12
  },
  {
    id: 13,
    name: "Unordered lists (ol)",
    descript: `ol 태그의 요소입니다. 순서가 있는 리스트에 사용됩니다. 문자 앞에 숫자 혹은 영문이 들어갑니다. 내부에는 기본적으로 li 요소가 하나 들어있습니다.`,
    comp: c13
  },
  {
    id: 14,
    name: "Unordered lists (ul)",
    descript: `li 태그의 요소입니다. 순서가 없는 리스트에 사용됩니다. 문자 앞에 기호가 들어갑니다. 내부에는 기본적으로 li 요소가 하나 들어있습니다.`,
    comp: c14
  },
  {
    id: 15,
    name: "Footer (footer)",
    descript: `footer 태그의 요소입니다. 주로 사이트의 제작자 정보 혹은 연락처 정보를 작성하는 부분입니다.`,
    comp: c15
  },
  {
    id: 16,
    name: "Header (header)",
    descript: `header 태그의 요소입니다. 주로 사이트의 제목을 작성하는 부분입니다.`,
    comp: c16
  },
  {
    id: 17,
    name: "Aside (aside)",
    descript: `aside 태그의 요소입니다. 주로 사이드 바를 표시할때 사용합니다.`,
    comp: c17
  },
  {
    id: 18,
    name: "Navigation bar (nav)",
    descript: `nav 태그의 요소입니다. 주로 사이트의 위치를 이동하는 기능을 가지고 있는 요소를 넣어줍니다.`,
    comp: c18
  },
  {
    id: 19,
    name: "Select (select)",
    descript: `select 태그의 요소입니다. 내부에 option 태그의 요소를 넣어서 선택이 가능하게 해줍니다. 기본적으로 내부에 option 태그의 요소가 하나 들어있습니다.`,
    comp: c19
  },
  {
    id: 20,
    name: "Option (option)",
    descript: `option 태그의 요소입니다. select 태그의 요소 내부에 넣을 수 있습니다.`,
    comp: c20
  },
  {
    id: 21,
    name: "Main (main)",
    descript: `main 태그의 요소입니다. 주가 되는 콘텐츠를 넣습니다.`,
    comp: c21
  },
]

export const compAttribute: { [key: string]: string[] } = {
  div: ["name"],
  span: ["name"],
  input: ["name", "type", "placeholder"],
  img: ["name", "src", "alt"],
  a: ["name", "href", "target"],
  h1: ["name"],
  h2: ["name"],
  h3: ["name"],
  h4: ["name"],
  h5: ["name"],
  p: ["name"]
}

export const ableInsert = ["img", "input"];

export const dbClickAble = ["h1", "h2", "h3", "h4", "h5", "p", "a", "li", "option"];