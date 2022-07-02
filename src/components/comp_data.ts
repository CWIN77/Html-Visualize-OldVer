import { IComp_data } from "../types"
import c1 from "../comps/c1"
import c2 from "../comps/c2"

export const comp_data: IComp_data[] = [
  {
    id: 0,
    name: "문자 입력칸",
    descript: "문자를 입력 할 수 있는 칸을 추가합니다.",
    comp: c1
  },
  {
    id: 1,
    name: "네비게이션 바",
    descript: "페이지를 바꿀 수 있는 스크롤에 방해받지 않는 컴포넌트입니다.",
    comp: c1
  }
]