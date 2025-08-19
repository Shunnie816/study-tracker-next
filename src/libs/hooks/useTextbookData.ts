import { addDoc, collection, getDocs } from "firebase/firestore";
import { useMemo } from "react";
import useSWR from "swr";
import { db } from "../firebase";
import { COLLECTIONS } from "../firebase/constants";
import { Textbook } from "../types";

export function useTextbookData() {
  const apiPath = "textbooks";

  async function fetchTextbooks() {
    /** Firestoreからデータを取得 */
    const textbookData = await getDocs(collection(db, COLLECTIONS.TEXTBOOKS));
    const textbooks = textbookData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Textbook[];
    return textbooks;
  }

  // TODO: idは登録しないので、idを除外する
  async function postData(textbook: Textbook) {
    /** Firestoreに教材データを登録 */
    try {
      await addDoc(collection(db, COLLECTIONS.TEXTBOOKS), {
        ...textbook,
      });
    } catch (e) {
      console.error("Error adding textbook: ", e);
    }
  }

  const { data } = useSWR(apiPath, fetchTextbooks, {
    onSuccess(data) {
      return data;
    },
    onError(error) {
      console.log("Error fetching textbooks: ", error);
    },
  });

  const textbooks = useMemo(() => {
    return data ?? [];
  }, [data]);

  return {
    textbooks,
    postData,
  };
}

export type UseTextbookData = ReturnType<typeof useTextbookData>;
