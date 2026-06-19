import { renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { PostData } from "../types";
import { useWeeklyTotal } from "./useWeeklyTotal";

// 2025-09-23 (火) に固定
// startOfWeek (weekStartsOn: 1) → 2025-09-22 (月)
// THIS_WEEK を FIXED_NOW と同日にすることで UTC midnight 解釈の timezone ズレを回避
const FIXED_NOW = new Date("2025-09-23T12:00:00.000Z");
const THIS_WEEK = "2025/09/23 10:00";
const LAST_WEEK = "2025/09/14 10:00";

const makePost = (date: string, time: number): PostData => ({
  id: "1",
  date,
  textbook: { id: "t1", name: "テスト教材" },
  time,
  content: "内容",
});

describe("useWeeklyTotal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("undefined を渡したとき「0分」を返すべき", () => {
    const { result } = renderHook(() => useWeeklyTotal(undefined));
    expect(result.current).toBe("0分");
  });

  it("空配列を渡したとき「0分」を返すべき", () => {
    const posts: PostData[] = [];
    const { result } = renderHook(() => useWeeklyTotal(posts));
    expect(result.current).toBe("0分");
  });

  it("今週の記録が 0 件のとき「0分」を返すべき", () => {
    const posts = [makePost(LAST_WEEK, 30)];
    const { result } = renderHook(() => useWeeklyTotal(posts));
    expect(result.current).toBe("0分");
  });

  it("今週の合計が 60 分未満のとき「N分」形式で返すべき", () => {
    const posts = [makePost(THIS_WEEK, 45)];
    const { result } = renderHook(() => useWeeklyTotal(posts));
    expect(result.current).toBe("45分");
  });

  it("今週の合計がちょうど 60 分のとき「N時間」形式（分なし）で返すべき", () => {
    const posts = [makePost(THIS_WEEK, 60)];
    const { result } = renderHook(() => useWeeklyTotal(posts));
    expect(result.current).toBe("1時間");
  });

  it("今週の合計が 60 分超のとき「N時間M分」形式で返すべき", () => {
    const posts = [makePost(THIS_WEEK, 90), makePost(THIS_WEEK, 45)];
    const { result } = renderHook(() => useWeeklyTotal(posts));
    expect(result.current).toBe("2時間15分");
  });

  it("今週と先週の記録が混在するとき、今週分のみ合計するべき", () => {
    const posts = [makePost(THIS_WEEK, 60), makePost(LAST_WEEK, 120)];
    const { result } = renderHook(() => useWeeklyTotal(posts));
    expect(result.current).toBe("1時間");
  });
});
