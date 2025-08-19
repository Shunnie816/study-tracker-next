import { addDoc, collection, getDocs } from "@firebase/firestore";
import useSWR from "swr";
import { PostData } from "@/pages/api/post";
import { db } from "../firebase";
import { COLLECTIONS } from "../firebase/constants";

export const usePosts = () => {
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
  };
};

export type UsePosts = ReturnType<typeof usePosts>;
