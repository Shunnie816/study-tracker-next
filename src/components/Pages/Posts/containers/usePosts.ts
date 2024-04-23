import { PostData } from "@/pages/api/post";
import axios from "axios";
import useSWR from "swr";

export const usePosts = () => {
  const apiPath = "/api/post";

  async function fetchData(): Promise<PostData[]> {
    try {
      const res = await axios.get(apiPath);
      return res.data;
    } catch (error) {
      throw new Error("データが取得できませんでした。");
    }
  }

  async function postData(data: PostData) {
    try {
      await axios.post(apiPath, data);
    } catch (error) {
      throw new Error("データを登録できませんでした。");
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

/** TODO: このコード調べる */
export type UsePosts = ReturnType<typeof usePosts>;
