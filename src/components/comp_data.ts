import { IComp_data } from "../types"
import c0 from "../comps/c0"
import c1 from "../comps/c1"

export const comp_data: IComp_data[] = [
  {
    id: 0,
    name: "문자 입력칸",
    descript: "문자를 입력 할 수 있는 칸을 추가합니다.",
    comp: c0
  },
  {
    id: 1,
    name: "Div",
    descript: "내용이 없는 div tag element입니다. 식별을 위해 배경색은 하얀색이 아닙니다.",
    comp: c1
  }
]