import { ICompData } from "../types"
import c0 from "./c0"
import c1 from "./c1"

export const compData: ICompData[] = [
  {
    id: 0,
    name: "문자 입력칸",
    descript: "문자를 입력 할 수 있는 칸을 추가합니다.",
    comp: c0
  },
  {
    id: 1,
    name: "div 상자",
    descript: "div element입니다. width, height, min-height의 기본값은 각각 100%, 100%, 50px입니다.",
    comp: c1
  }
]

export const compAttribute: { [key: string]: string[] } = {
  input: ["type", "placeholder"],
  a: ["href"],
  img: ["src", "alt"]
}

export const ableInsert = ["img", "input"];