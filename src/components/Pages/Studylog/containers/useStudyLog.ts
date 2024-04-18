import { PostData } from "@/pages/api/post";
import { Textbook } from "@/pages/api/textbook";
import axios from "axios";
import { text } from "stream/consumers";
import useSWR from "swr";

export const useStudyLog = () => {
  const apiPathToPost = "/api/post";
  const apiPathToTextbook = "/api/textbook";

  async function fetchPostData(): Promise<PostData[]> {
    try {
      const res = await axios.get(apiPathToPost);
      return res.data;
    } catch (error) {
      throw new Error("データが取得できませんでした。");
    }
  }

  async function fetchTextbookData(): Promise<Textbook[]> {
    try {
      const res = await axios.get(apiPathToTextbook);
      return res.data;
    } catch (error) {
      throw new Error("データが取得できませんでした。");
    }
  }

  /** isLoading, errorハンドリングを記述する */
  const { data: postData } = useSWR(apiPathToPost, fetchPostData, {
    onSuccess(data) {
      return data;
    },
    onError(error) {
      console.log("swr returns error", error);
    },
  });

  /** isLoading, errorハンドリングを記述する */
  const { data: textbooks } = useSWR(apiPathToTextbook, fetchTextbookData, {
    onSuccess(data) {
      return data;
    },
    onError(error) {
      console.log("swr returns error", error);
    },
  });

  const mappedData = postData?.map((log) => {
    return { textbook: log.textbook.id, time: parseInt(log.time) };
  });

  const logData = textbooks?.map((textbook) => {
    return { id: textbook.id, name: textbook.name, time: 0 };
  });

  // textbookのnameでfilterしてmappedData内で同じnameをもつ要素のtimeをまとめる
  // まとめたものを一つの要素としてもつ配列をtextbooks配列をベースに作り直す。
  const data = logData?.map((textbook) => {
    const filteredData = mappedData?.filter((log) => {
      if (log.textbook === textbook.name) {
        textbook.time += log.time;
      }
    });
    return filteredData; //戻り値のオブジェクトにidが入るようにしたい
  });

  return {
    data,
  };
};

/** TODO: このコード調べる */
export type UseStudyLog = ReturnType<typeof useStudyLog>;
