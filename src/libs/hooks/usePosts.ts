import { PostData } from "@/pages/api/post";
import { addDoc, collection } from "@firebase/firestore";
import axios from "axios";
import useSWR from "swr";
import { db } from "../firebase";
import { COLLECTIONS } from "../firebase/constants";

export const usePosts = () => {
  const apiPath = "posts";

  // TODO: firestoreに置き換え
  async function fetchData(): Promise<PostData[]> {
    try {
      const res = await axios.get(apiPath);
      return res.data;
    } catch (error) {
      throw new Error("データが取得できませんでした。");
    }
  }

  async function postData(data: PostData) {
    /** Firestoreに教材データを登録 */
    try {
      await addDoc(collection(db, COLLECTIONS.POSTS), { ...data });
    } catch (e) {
      console.error("Error adding post: ", e);
    }
  }

  /** isLoading, errorハンドリングを記述する */
  const { data: posts } = useSWR(apiPath, fetchData, {
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
  };
};

export type UsePosts = ReturnType<typeof usePosts>;
