import { ICompData } from "../types"
import c0 from "./c0"
import c1 from "./c1"
import c2 from "./c2"
import c3 from "./c3"
import c4 from "./c4"
import c5 from "./c5"
import c6 from "./c6"

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
  }
]

export const compAttribute: { [key: string]: string[] } = {
  all: ["name"],
  input: ["type", "placeholder"],
  a: ["href", "target"],
  img: ["src", "alt"]
}

export const ableInsert = ["img", "input"];