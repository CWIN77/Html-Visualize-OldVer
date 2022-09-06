import create from "zustand";

const defaultComp: HTMLElement = document.getElementById("view") || document.body;
const defaultHvResult: String = "";
export const useStore = create(() => ({
  selectedComp: defaultComp,
  hvResult: defaultHvResult
}))