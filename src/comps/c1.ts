import { defaultStyle } from "./compValue"
import { ICom } from "../types"

const Comp: ICom = {
  id: "comp1",
  tagName: "div",
  ableStyle: {
    ...defaultStyle,
    "display": [
      "flex",
      "inline",
      "block",
      "inline-block",
      "none"
    ],
    "flex-direction": [
      "row",
      "row-reverse",
      "column",
      "column-reverse",
    ],
    "align-items": [
      "center",
      "flex-start",
      "flex-end",
    ],
    "justify-content": [
      "center",
      "flex-start",
      "flex-end",
      "space-between",
      "space-around",
      "space-evenly",
    ]
  },
  style: `
    width:100%;
    min-height:25px;
    background-color:#F3F3F3;
  `
}

export default Comp