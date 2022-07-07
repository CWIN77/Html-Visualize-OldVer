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
  "margin-left": "detail",
  "margin-right": "detail",
  "margin-top": "detail",
  "margin-bottom": "detail",
  "padding": "value",
  "padding-left": "detail",
  "padding-right": "detail",
  "padding-top": "detail",
  "padding-bottom": "detail",
  "background-color": "value",
  "border": "value",
  "border-radius": "value",
  // "box-shadow": "detail",
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
  "font-weight": "value",
  "text-align": [
    "start",
    "end",
    "center",
    "justify"
  ],
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

const imgStyle: TAbleStyle = {
  ...defaultStyle
}

const aStyle: TAbleStyle = {
  ...defaultStyle,
  "font-size": "value",
  "font-weight": "value",
  "color": "value"
}

const viewStyle: TAbleStyle = {
  "width": "value",
  "height": "value",
  "min-width": "detail",
  "min-height": "detail",
  "max-width": "detail",
  "max-height": "detail",
  "padding": "value",
  "background-color": "value",
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


export const elementStyle: { [key: string]: TAbleStyle } = {
  view: viewStyle,
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