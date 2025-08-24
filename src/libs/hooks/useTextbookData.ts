import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useMemo, useEffect } from "react";
import useSWR, { mutate } from "swr";
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

  async function registerTextbook(textbook: Textbook) {
    /** Firestoreに教材データを登録 */
    try {
      await addDoc(collection(db, COLLECTIONS.TEXTBOOKS), {
        ...textbook,
      });
    } catch (e) {
      console.error("Error adding textbook: ", e);
    }
  }

  async function editTextbook(id: string, textbook: Textbook) {
    /** Firestoreの教材データを更新 */
    try {
      const textbookRef = doc(db, COLLECTIONS.TEXTBOOKS, id);
      await updateDoc(textbookRef, {
        ...textbook,
      });
    } catch (e) {
      console.error("Error updating textbook: ", e);
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

  /** Firestoreの教材データを監視(リアルタイム更新) */
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, COLLECTIONS.TEXTBOOKS),
      (snapshot) => {
        const updatedTextbooks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Textbook[];
        // SWRのキャッシュを更新
        mutate(apiPath, updatedTextbooks, false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    textbooks,
    registerTextbook,
    editTextbook,
  };
}

export type UseTextbookData = ReturnType<typeof useTextbookData>;
