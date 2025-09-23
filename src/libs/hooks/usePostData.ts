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
} from "@firebase/firestore";
import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import useSWR, { mutate } from "swr";
import { db } from "../firebase";
import { COLLECTIONS } from "../firebase/constants";
import { PostData, ReportData } from "../types";
import { useAppCheck } from "./useAppCheck";

export const usePostData = () => {
  const apiPath = "posts";
  const { isAppCheckReady } = useAppCheck();

  /** 投稿データを作った順(昇順)で取得 */
  const fetchQuery = query(
    collection(db, COLLECTIONS.POSTS),
    orderBy("createdAt", "desc")
  );

  async function fetchPostData() {
    /** Firestoreからデータを取得 */
    const posts = await getDocs(fetchQuery);
    return posts.docs.map((doc) => {
      const date = doc.data().createdAt.toDate() as Date;
      const formatedDate = format(date, "yyyy/MM/dd HH:mm");
      return {
        ...doc.data(),
        id: doc.id,
        date: formatedDate,
      };
    }) as PostData[];
  }

  async function postData(data: ReportData) {
    /** Firestoreに教材データを登録 */
    try {
      await addDoc(collection(db, COLLECTIONS.POSTS), {
        ...data,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding post: ", e);
    }
  }

  async function deletePost(id: string) {
    /** Firestoreから教材データを削除 */
    try {
      await deleteDoc(doc(db, COLLECTIONS.POSTS, id));
    } catch (e) {
      console.error("Error deleting post: ", e);
    }
  }

  const { data, isLoading, error } = useSWR(
    isAppCheckReady ? apiPath : null,
    fetchPostData,
    {
      onSuccess(data) {
        return data;
      },
      onError(error) {
        console.log("swr returns error", error);
      },
    }
  );

  const posts = useMemo(() => {
    return data?.map((item) => {
      const totalMinutes = Number(item.time);
      const hour = Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;
      let timeString = "";
      if (hour > 0) {
        timeString = `${hour}時間${minute > 0 ? minute + "分" : ""}`;
      } else {
        timeString = `${minute}分`;
      }
      return {
        ...item,
        time: timeString,
      };
    });
  }, [data]);

  /** Firestoreのデータを監視(リアルタイム更新) - AppCheckトークン取得後のみ */
  useEffect(() => {
    if (!isAppCheckReady) return;
    const unsubscribe = onSnapshot(fetchQuery, (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => {
        const date = doc.data().createdAt.toDate() as Date;
        const formatedDate = format(date, "yyyy/MM/dd HH:mm");
        return {
          id: doc.id,
          date: formatedDate,
          ...doc.data(),
        };
      }) as PostData[];

      // SWRのキャッシュを更新(データはSWRが保持しているため、ここで更新する必要がある)
      mutate(apiPath, updatedPosts, false);
    });

    return () => {
      unsubscribe();
    };
  }, [fetchQuery, isAppCheckReady]);

  return {
    posts,
    postData,
    isLoading,
    error,
    deletePost,
  };
};

export type UsePostData = ReturnType<typeof usePostData>;
