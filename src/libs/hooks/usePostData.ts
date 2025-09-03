"use client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "@firebase/firestore";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import { db } from "../firebase";
import { COLLECTIONS } from "../firebase/constants";
import { PostData } from "../types";

export const usePostData = () => {
  const apiPath = "posts";

  async function fetchPostData() {
    /** Firestoreからデータを取得 */
    const posts = await getDocs(collection(db, COLLECTIONS.POSTS));
    return posts.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PostData[];
  }

  async function postData(data: PostData) {
    /** Firestoreに教材データを登録 */
    try {
      await addDoc(collection(db, COLLECTIONS.POSTS), { ...data });
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

  /** Firestoreのデータを監視(リアルタイム更新) */
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, COLLECTIONS.POSTS),
      (snapshot) => {
        const updatedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PostData[];

        // SWRのキャッシュを更新(データはSWRが保持しているため、ここで更新する必要がある)
        mutate(apiPath, updatedPosts, false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  /** isLoading, errorハンドリングを記述する */
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(apiPath, fetchPostData, {
    onSuccess(data) {
      return data;
    },
    onError(error) {
      console.log("swr returns error", error);
    },
  });

  return {
    posts,
    postData,
    isLoading,
    error,
    deletePost,
  };
};

export type UsePostData = ReturnType<typeof usePostData>;
