import { TAbleStyle } from "../types"

export const color = {
  white: "#FFFFFF",
  black: "#000000"
}

const defaultStyle: TAbleStyle = {
  "width": "calc",
  "height": "calc",
  "min-width": "calc",
  "min-height": "calc",
  "max-width": "calc",
  "max-height": "calc",
  "margin-left": "calc",
  "margin-right": "calc",
  "margin-top": "calc",
  "margin-bottom": "calc",
  "padding-left": "calc",
  "padding-right": "calc",
  "padding-top": "calc",
  "padding-bottom": "calc",
  "background-color": "value",
  "border": "value",
  "border-radius": "value",
  "box-shadow": "value",
}

const divStyle: TAbleStyle = {
  ...defaultStyle,
  "font-size": "calc",
  "color": "value",
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
}

const inputStyle: TAbleStyle = {
  ...defaultStyle,
  "font-size": "calc",
  "color": "value",
  "font-weight": "value"
}

const hStyle: TAbleStyle = {
  ...defaultStyle,
  "font-size": "calc",
  "color": "value",
  "font-weight": "value",
  "text-align": [
    "start",
    "end",
    "center",
    "justify"
  ]
}

const imgStyle: TAbleStyle = {
  ...defaultStyle
}

const aStyle: TAbleStyle = {
  ...defaultStyle,
  "font-size": "calc",
  "font-weight": "value",
  "color": "value"
}


export const elementStyle: { [key: string]: TAbleStyle } = {
  div: divStyle,
  input: inputStyle,
  img: imgStyle,
  a: aStyle,
  h1: hStyle,
  h2: hStyle,
  h3: hStyle,
  h4: hStyle,
  h5: hStyle
}