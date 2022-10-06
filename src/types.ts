export interface ICompData {
  id: number;
  name: string;
  descript: string;
  comp: string;
  tag: string;
}

export type TAbleStyle = {
  [key: string]: "value" | "detail" | "color" | string[];
}

export interface IHvData {
  id: String;
  html: String;
  author: String;
  title: String;
  createdAt: String;
  updatedAt: String;
}

export interface IUser {
  img: String;
  name: String;
  id: String;
  joinId: String;
}

export interface IShareComp {
  id: String;
  html: String;
  author: String;
  name: String;
  descript: String;
  createdAt: String;
  updatedAt: String;
}