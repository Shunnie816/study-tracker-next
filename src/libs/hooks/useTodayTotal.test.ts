import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PostData } from "../types";
import { useTodayTotal } from "./useTodayTotal";

// 2025-09-23 (火) 正午に固定（UTC midnight のタイムゾーンズレを回避）
const FIXED_NOW = new Date("2025-09-23T12:00:00.000Z");
const TODAY = "2025/09/23 10:00";
const YESTERDAY = "2025/09/22 10:00";

const makePost = (date: string, time: number): PostData => ({
  id: "1",
  date,
  textbook: { id: "t1", name: "テスト教材" },
  time,
  content: "内容",
});

describe("useTodayTotal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("undefined を渡したとき「0分」を返すべき", () => {
    const { result } = renderHook(() => useTodayTotal(undefined));
    expect(result.current).toBe("0分");
  });

  it("空配列を渡したとき「0分」を返すべき", () => {
    const { result } = renderHook(() => useTodayTotal([]));
    expect(result.current).toBe("0分");
  });

  it("今日の記録が 0 件のとき「0分」を返すべき", () => {
    const posts = [makePost(YESTERDAY, 30)];
    const { result } = renderHook(() => useTodayTotal(posts));
    expect(result.current).toBe("0分");
  });

  it("今日の合計が 60 分未満のとき「N分」形式で返すべき", () => {
    const posts = [makePost(TODAY, 45)];
    const { result } = renderHook(() => useTodayTotal(posts));
    expect(result.current).toBe("45分");
  });

  it("今日の合計がちょうど 60 分のとき「N時間」形式（分なし）で返すべき", () => {
    const posts = [makePost(TODAY, 60)];
    const { result } = renderHook(() => useTodayTotal(posts));
    expect(result.current).toBe("1時間");
  });

  it("今日の合計が 60 分超のとき「N時間M分」形式で返すべき", () => {
    const posts = [makePost(TODAY, 90), makePost(TODAY, 45)];
    const { result } = renderHook(() => useTodayTotal(posts));
    expect(result.current).toBe("2時間15分");
  });

  it("今日と昨日の記録が混在するとき、今日分のみ合計するべき", () => {
    const posts = [makePost(TODAY, 60), makePost(YESTERDAY, 120)];
    const { result } = renderHook(() => useTodayTotal(posts));
    expect(result.current).toBe("1時間");
  });
});
