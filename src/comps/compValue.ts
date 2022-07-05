import { TAbleStyle } from "../types"

export const color = {
  white: "#FFFFFF",
  black: "#000000"
}

const defaultStyle: TAbleStyle = {
  "width": "value",
  "height": "value",
  "min-width": "detail",
  "min-height": "detail",
  "max-width": "detail",
  "max-height": "detail",
  "margin": "value",
  "padding": "value",
  "background-color": "value",
  "border": "value",
  "border-radius": "value",
  "box-shadow": "value",
  "position": [
    "static",
    "absolute",
    "relative",
    "fixed",
    "sticky"
  ]
}

const divStyle: TAbleStyle = {
  ...defaultStyle,
  "font-size": "value",
  "color": "value",
  "display": [
    "flex",
    "inline",
    "block",
    "inline-block",
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
  "font-size": "value",
  "color": "value",
  "font-weight": "value"
}

const hStyle: TAbleStyle = {
  ...defaultStyle,
  "font-size": "value",
  "color": "value",
  "font-weight": "value",
  "text-align": [
    "start",
    "end",
    "center",
    "justify"
  ],
  "display": [
    "flex",
    "inline",
    "block",
    "inline-block",
  ],
}

const imgStyle: TAbleStyle = {
  ...defaultStyle
}

const aStyle: TAbleStyle = {
  ...defaultStyle,
  "font-size": "value",
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