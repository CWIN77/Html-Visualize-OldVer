import create from "zustand";

export const useStore = create(() => ({
  selectedComp: null as HTMLElement|null
}))