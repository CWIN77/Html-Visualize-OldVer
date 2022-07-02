const Comp: { tag: string, props?: { [key: string]: string }[], styles: { [key: string]: string }[] }[] = [
  {
    tag: "input",
    props: [
      { placeholder: "플레이스홀더!!" },
      { type: "text" }
    ],
    styles: [
      { width: "calc(100% - 32px - 28px)" },
      { backgroundColor: "#ff0000" },
      { fontSize: "14px" },
      { padding: "14px 16px" },
      { margin: "14px" },
      { borderRadius: "4px 0px 0px 4px" },
      { color: "#E8E8E8" },
    ]
  }
]

export default Comp