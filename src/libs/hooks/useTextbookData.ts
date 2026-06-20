import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import { TEXTBOOK_COLOR_PALETTE } from "../constants/textbookColors";
import { db } from "../firebase";
import { COLLECTIONS } from "../firebase/constants";
import { Textbook } from "../types";
import { useAppCheck } from "./useAppCheck";
import { useAuth } from "./useAuth";

export function useTextbookData() {
  const apiPath = "textbooks";
  const { isAppCheckReady } = useAppCheck();
  const { user } = useAuth();

  /** 教材データを作った順(昇順)で取得 */
  const fetchQuery = query(
    collection(db, COLLECTIONS.TEXTBOOKS),
    where("uid", "==", user?.uid ?? ""),
    orderBy("createdAt", "asc")
  );

  async function fetchTextbooks() {
    /** Firestoreからデータを取得 */
    const textbookData = await getDocs(fetchQuery);
    const textbooks = textbookData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Textbook[];
    return textbooks;
  }

  async function registerTextbook(textbook: Textbook) {
    /** Firestoreに教材データを登録 */
    try {
      const color =
        TEXTBOOK_COLOR_PALETTE[
          textbooks.length % TEXTBOOK_COLOR_PALETTE.length
        ];
      await addDoc(collection(db, COLLECTIONS.TEXTBOOKS), {
        ...textbook,
        uid: user?.uid,
        color,
        createdAt: serverTimestamp(),
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

  async function deleteTextbook(id: string) {
    /** Firestoreの教材データを削除 */
    try {
      const textbookRef = doc(db, COLLECTIONS.TEXTBOOKS, id);
      await deleteDoc(textbookRef);
    } catch (e) {
      console.error("Error deleting textbook: ", e);
    }
  }

  const { data, isLoading, error } = useSWR(
    isAppCheckReady && user ? apiPath : null,
    fetchTextbooks,
    {
      onSuccess(data) {
        return data;
      },
      onError(error) {
        console.log("Error fetching textbooks: ", error);
      },
    }
  );

  const textbooks = data ?? [];

  /** Firestoreの教材データを監視(リアルタイム更新) - AppCheckトークン取得後のみ */
  useEffect(() => {
    if (!isAppCheckReady || !user) return;
    const unsubscribe = onSnapshot(fetchQuery, (snapshot) => {
      const updatedTextbooks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Textbook[];
      // SWRのキャッシュを更新
      mutate(apiPath, updatedTextbooks, false);
    });
    return () => {
      unsubscribe();
    };
  }, [fetchQuery, isAppCheckReady]);

  return {
    textbooks,
    registerTextbook,
    editTextbook,
    deleteTextbook,
    isLoading,
    error,
  };
}

export type UseTextbookData = ReturnType<typeof useTextbookData>;
