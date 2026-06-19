import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PostData } from "../types";
import { useTextbookStats } from "./useTextbookStats";

const makePost = (
  id: string,
  textbookId: string,
  textbookName: string,
  time: number,
  color = "#4361EE"
): PostData => ({
  id,
  date: "2025/09/23 10:00",
  textbook: { id: textbookId, name: textbookName, color },
  time,
  content: "内容",
});

describe("useTextbookStats", () => {
  it("undefined を渡したとき空配列を返すべき", () => {
    const { result } = renderHook(() => useTextbookStats(undefined));
    expect(result.current).toEqual([]);
  });

  it("空配列を渡したとき空配列を返すべき", () => {
    const { result } = renderHook(() => useTextbookStats([]));
    expect(result.current).toEqual([]);
  });

  it("同じ教材 ID の記録をまとめて合計するべき", () => {
    const posts = [
      makePost("p1", "t1", "英語", 30),
      makePost("p2", "t1", "英語", 45),
    ];
    const { result } = renderHook(() => useTextbookStats(posts));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].totalMinutes).toBe(75);
  });

  it("異なる教材 ID の記録を別々に集計するべき", () => {
    const posts = [
      makePost("p1", "t1", "英語", 30),
      makePost("p2", "t2", "数学", 60),
    ];
    const { result } = renderHook(() => useTextbookStats(posts));
    expect(result.current).toHaveLength(2);
  });

  it("合計時間の降順でソートされるべき", () => {
    const posts = [
      makePost("p1", "t1", "英語", 30),
      makePost("p2", "t2", "数学", 90),
      makePost("p3", "t3", "理科", 60),
    ];
    const { result } = renderHook(() => useTextbookStats(posts));
    expect(result.current[0].textbook.name).toBe("数学");
    expect(result.current[1].textbook.name).toBe("理科");
    expect(result.current[2].textbook.name).toBe("英語");
  });

  it("教材 ID がない場合は教材名をキーに集計するべき", () => {
    const posts: PostData[] = [
      {
        id: "p1",
        date: "2025/09/23 10:00",
        textbook: { name: "英語" },
        time: 30,
        content: "",
      },
      {
        id: "p2",
        date: "2025/09/23 11:00",
        textbook: { name: "英語" },
        time: 20,
        content: "",
      },
    ];
    const { result } = renderHook(() => useTextbookStats(posts));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].totalMinutes).toBe(50);
  });

  it("各集計結果に教材の色情報が含まれるべき", () => {
    const posts = [makePost("p1", "t1", "英語", 30, "#FF5722")];
    const { result } = renderHook(() => useTextbookStats(posts));
    expect(result.current[0].textbook.color).toBe("#FF5722");
  });

  describe("textbookColorMap による色補完", () => {
    it("post に color がなく textbookColorMap に一致する ID があるとき、マップの色を返すべき", () => {
      const posts: PostData[] = [
        {
          id: "p1",
          date: "2025/09/23 10:00",
          textbook: { id: "t1", name: "英語" },
          time: 30,
          content: "",
        },
      ];
      const colorMap = new Map([["t1", "#10B981"]]);
      const { result } = renderHook(() => useTextbookStats(posts, colorMap));
      expect(result.current[0].textbook.color).toBe("#10B981");
    });

    it("post に color があり textbookColorMap にも色があるとき、post の color を優先すべき", () => {
      const posts = [makePost("p1", "t1", "英語", 30, "#FF5722")];
      const colorMap = new Map([["t1", "#10B981"]]);
      const { result } = renderHook(() => useTextbookStats(posts, colorMap));
      expect(result.current[0].textbook.color).toBe("#FF5722");
    });

    it("post に color がなく textbookColorMap に一致する ID がないとき、color が undefined であるべき", () => {
      const posts: PostData[] = [
        {
          id: "p1",
          date: "2025/09/23 10:00",
          textbook: { id: "t1", name: "英語" },
          time: 30,
          content: "",
        },
      ];
      const colorMap = new Map([["t2", "#10B981"]]);
      const { result } = renderHook(() => useTextbookStats(posts, colorMap));
      expect(result.current[0].textbook.color).toBeUndefined();
    });

    it("post に color がなく textbookColorMap を渡さないとき、color が undefined であるべき", () => {
      const posts: PostData[] = [
        {
          id: "p1",
          date: "2025/09/23 10:00",
          textbook: { id: "t1", name: "英語" },
          time: 30,
          content: "",
        },
      ];
      const { result } = renderHook(() => useTextbookStats(posts));
      expect(result.current[0].textbook.color).toBeUndefined();
    });
  });
});
