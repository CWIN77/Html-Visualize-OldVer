import create from "zustand";

const isSelectChange: boolean = false;
const hvResult: String = "";
const isChangeComp: boolean = true;

export const useStore = create(() => ({
  isSelectChange, hvResult, isChangeComp
}))

export const changeHvStorage = (hvId: string) => {
  if (document.getElementById("view")?.outerHTML !== undefined) {
    const sHistory: string[] = JSON.parse(sessionStorage.getItem(hvId) || JSON.stringify([]));
    const html = (document.getElementById("view")?.outerHTML as string)
      .replace("box-shadow: rgb(13, 153, 255) 0px 0px 0px 2.5px inset;", "")
      .replace("box-shadow: rgb(139, 204, 251) 0px 0px 0px 2.5px inset;", "");
    if (sHistory[sHistory.length - 1] !== html) {
      sessionStorage.setItem(hvId, JSON.stringify([...sHistory, html]));
      sessionStorage.setItem(hvId + "undo", JSON.stringify([]));
      useStore.setState({ isChangeComp: true });
    }
  }
}

export const getSelectComp = (hvId: string) => {
  const storageCompName: string | null = JSON.parse(sessionStorage.getItem(hvId + "selectComp") || JSON.stringify(null));
  const selectComp = storageCompName ? document.querySelector("." + storageCompName) as HTMLElement : document.body;
  return selectComp;
}