import { API } from "aws-amplify";
import create from "zustand";
import { getCurrentUser } from "./firebase/auth";
import { updateHvData } from "./graphql/mutations";
import { IHvData } from "./types";

const isSelectChange: boolean = false;
const hvResult: String = "";
const isChangeHv: boolean = true;

export const useStore = create(() => ({
  isSelectChange, hvResult, isChangeHv
}))

let onDelay = false;
export const changeHvStorage = async (hvData: IHvData) => {
  const user = getCurrentUser();
  if (document.getElementById("view")?.outerHTML !== undefined) {
    const sHistory: string[] = JSON.parse(sessionStorage.getItem(String(hvData.id)) || JSON.stringify([]));
    const html = (document.getElementById("view")?.outerHTML as string)
      .replace("box-shadow: rgb(13, 153, 255) 0px 0px 0px 2.5px inset;", "")
      .replace("box-shadow: rgb(139, 204, 251) 0px 0px 0px 2.5px inset;", "");
    if (sHistory[sHistory.length - 1] !== html) {
      sessionStorage.setItem(String(hvData.id), JSON.stringify([...sHistory, html]));
      sessionStorage.setItem(hvData.id + "undo", JSON.stringify([]));
      useStore.setState({ isChangeHv: true });
      if (!onDelay) {
        if (user?.uid === hvData.author) {
          const result = API.graphql({
            query: updateHvData,
            variables: {
              input: {
                id: hvData.id,
                html: html
              }
            }
          }) as any;
          result.then(({ data }: { data: { updateHvData: IHvData } }) => {
            if (data && data.updateHvData) {
              console.log("HV 업데이트 성공");
            } else {
              console.error("HV 업데이트 실패");
            }
          });
          onDelay = true;
          setTimeout(() => {
            onDelay = false;
          }, 500);
        } else {
          alert("로그인 되어있지 않습니다.");
        }
      } else {
        return;
      }
    }
  }
}

export const getSelectComp = (hvId: string) => {
  const storageCompName: string | null = JSON.parse(sessionStorage.getItem(hvId + "selectComp") || JSON.stringify(null));
  const selectComp = storageCompName ? document.querySelector("." + storageCompName) as HTMLElement : document.body;
  return selectComp;
}