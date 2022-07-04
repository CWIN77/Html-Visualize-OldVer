export interface ICompData {
  id: number,
  name: string,
  descript: string,
  comp: {
    tagName: string,
    style: string;
    [key: string]: string
  }
} 