import create from "zustand";

const defaultComp: HTMLElement = document.getElementById("view") || document.body;
export const useStore = create(() => ({
  selectedComp: defaultComp
}))