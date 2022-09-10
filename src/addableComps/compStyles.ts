import { TAbleStyle } from "../types"

export const color = {
  white: "#FFFFFF",
  black: "#000000"
}

export const styleName: { [key: string]: string } = {
  "width": "W",
  "height": "H",
  "min-width": "min-W",
  "min-height": "min-H",
  "max-width": "max-W",
  "max-height": "max-H",
  "margin": "Mg",
  "margin-left": "mg-L",
  "margin-right": "mg-R",
  "margin-top": "mg-T",
  "margin-bottom": "mg-B",
  "padding": "Pd",
  "padding-left": "Pd-L",
  "padding-right": "Pd-R",
  "padding-top": "Pd-T",
  "padding-bottom": "Pd-B",
  "background-color": "Bg-C",
  "border": "Bor",
  "border-radius": "Bd-R",
  "position": "Pos",
  "left": "Lef",
  "rigth": "Rig",
  "top": "Top",
  "bottom": "Bot",
  "font-size": "Fo-Si",
  "color": "Col",
  "display": "Dis",
  "flex-direction": "Fl-D",
  "align-items": "Al-I",
  "justify-content": "Ju-C",
  "font-weight": "Fo-We",
  "text-align": "Tx-Al",
  "font-style": "Fo-St",
  "list-style": "Li-St",
  "text-decoration": "Te-De"
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
  ],
  "left": "detail",
  "rigth": "detail",
  "top": "detail",
  "bottom": "detail",
}

const boxStyle: TAbleStyle = {
  ...defaultStyle,
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

const textStyle: TAbleStyle = {
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
  "font-style": [
    "normal",
    "italic",
    "oblique"
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
  ],
  "text-decoration": "detail"
}

const imgStyle: TAbleStyle = {
  ...defaultStyle
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
  "display": [
    "flex",
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

const listStyle: TAbleStyle = {
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
  "font-style": [
    "normal",
    "italic",
    "oblique"
  ],
  "text-decoration": "detail",
  "list-style": [
    "square",
    "inside",
    "none"
  ]
}

export const elementStyle: { [key: string]: TAbleStyle } = {
  view: viewStyle,
  div: boxStyle,
  span: textStyle,
  input: textStyle,
  img: imgStyle,
  a: textStyle,
  h1: textStyle,
  h2: textStyle,
  h3: textStyle,
  h4: textStyle,
  h5: textStyle,
  p: textStyle,
  li: listStyle,
  ol: defaultStyle,
  ul: defaultStyle,
  footer: boxStyle,
  header: boxStyle,
  aside: boxStyle,
  nav: boxStyle,
  select: boxStyle,
  option: textStyle,
  article: boxStyle,
  section: boxStyle
}
