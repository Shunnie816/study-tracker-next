import { getToken } from "firebase/app-check";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { appCheck } from "../firebase";

/** 無限レンダリングを防ぐために外側に定義 */
const appCheckAtom = atom<boolean>(false);

/** AppCheckトークンが発行されているかを確認する */
export function useAppCheck() {
  const [isAppCheckReady, setIsAppCheckReady] = useAtom(appCheckAtom);

  useEffect(() => {
    (async () => {
      try {
        /** App Check初期化確認 */
        if (!appCheck) {
          setIsAppCheckReady(false);
          return;
        }
        /** トークンチェック(トークンが無い場合はfirestoreを呼び出さない) */
        const token = await getToken(appCheck, false);
        if (token && token.token) {
          setIsAppCheckReady(true);
        } else {
          setIsAppCheckReady(false);
        }
      } catch (error) {
        console.error("Error getting App Check token:", error);
        setIsAppCheckReady(false);
      }
    })();
  }, [setIsAppCheckReady]);

  return { isAppCheckReady };
}
