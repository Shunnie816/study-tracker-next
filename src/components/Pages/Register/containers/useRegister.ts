import { Textbook } from "@/pages/api/textbook";
import axios from "axios";
import { useMemo } from "react";
import useSWR from "swr";

export const useRegister = () => {
  const apiPath = "/api/textbook";

  async function fetchData(): Promise<Textbook[]> {
    try {
      const res = await axios.get("/api/textbook");
      return res.data;
    } catch (error) {
      throw new Error("データが取得できませんでした。");
    }
  }

  async function postData(textbook: Textbook) {
    try {
      await axios.post(apiPath, textbook);
    } catch (error) {
      throw new Error("データを登録できませんでした。");
    }
  }

  /** isLoading, errorハンドリングを記述する */
  const { data } = useSWR(apiPath, fetchData, {
    onSuccess(data) {
      return data;
    },
    onError(error) {
      console.log("swr returns error", error);
    },
  });

  const textbooks = useMemo(() => {
    return data ?? [];
  }, [data]);

  return {
    textbooks,
    postData,
  };
};

/** TODO: このコード調べる */
export type UseRegister = ReturnType<typeof useRegister>;
