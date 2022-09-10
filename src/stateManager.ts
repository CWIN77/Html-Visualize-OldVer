import create from "zustand";

const selectedComp: HTMLElement = document.getElementById("view") || document.body;
const hvResult: String = "";

export const useStore = create(() => ({
  selectedComp, hvResult
}))

export const changeHvStorage = (hvId: string) => {
  if (document.getElementById("view")?.outerHTML !== undefined) {
    const sHistory: string[] = JSON.parse(sessionStorage.getItem(hvId) || JSON.stringify([]));
    sessionStorage.setItem(hvId, JSON.stringify([...sHistory, document.getElementById("view")?.outerHTML as string]));
    sessionStorage.setItem(hvId + "undo", JSON.stringify([]));
  }
}