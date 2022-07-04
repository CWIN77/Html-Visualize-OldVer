export interface ICompData {
  id: number;
  name: string;
  descript: string;
  comp: ICom;
}

export interface ICom {
  tagName: string;
  style: string;
  ableStyle: TableStyle;
  [key: string]: string | TableStyle;
}

type TableStyle = {
  [key: string]: "value" | string[];
}