import { color, defaultStyle } from "./compValue"
import { ICom } from "../types"

const Comp: ICom = {
  tagName: "input",
  placeholder: "플레이스홀더!!",
  type: 'text',
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
    width:calc(100% - 24px - 24px);
    background-color: ${color.black}; 
    font-size: 14px; 
    padding: 12px; 
    margin: 12px; 
    border-radius: 4px; 
    color: ${color.white};
  `
}

export default Comp