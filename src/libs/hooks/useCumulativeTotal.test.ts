import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PostData } from "../types";
import { useCumulativeTotal } from "./useCumulativeTotal";

const makePost = (time: number): PostData => ({
  id: "1",
  date: "2025/09/23 10:00",
  textbook: { id: "t1", name: "テスト教材" },
  time,
  content: "内容",
});

describe("useCumulativeTotal", () => {
  it("undefined を渡したとき「0分」を返すべき", () => {
    const { result } = renderHook(() => useCumulativeTotal(undefined));
    expect(result.current).toBe("0分");
  });

  it("空配列を渡したとき「0分」を返すべき", () => {
    const { result } = renderHook(() => useCumulativeTotal([]));
    expect(result.current).toBe("0分");
  });

  it("合計が 60 分未満のとき「N分」形式で返すべき", () => {
    const posts = [makePost(30), makePost(20)];
    const { result } = renderHook(() => useCumulativeTotal(posts));
    expect(result.current).toBe("50分");
  });

  it("合計がちょうど 60 分のとき「N時間」形式（分なし）で返すべき", () => {
    const posts = [makePost(30), makePost(30)];
    const { result } = renderHook(() => useCumulativeTotal(posts));
    expect(result.current).toBe("1時間");
  });

  it("合計が 60 分超のとき「N時間M分」形式で返すべき", () => {
    const posts = [makePost(90), makePost(45)];
    const { result } = renderHook(() => useCumulativeTotal(posts));
    expect(result.current).toBe("2時間15分");
  });

  it("日付に関わらず全記録を合計するべき", () => {
    const posts: PostData[] = [
      {
        id: "1",
        date: "2025/09/23 10:00",
        textbook: { id: "t1", name: "A" },
        time: 60,
        content: "",
      },
      {
        id: "2",
        date: "2025/01/01 10:00",
        textbook: { id: "t2", name: "B" },
        time: 30,
        content: "",
      },
    ];
    const { result } = renderHook(() => useCumulativeTotal(posts));
    expect(result.current).toBe("1時間30分");
  });
});
