import { useMemo } from "react";
import { PostData, TextbookStat } from "../types";

export function useTextbookStats(
  rawPosts: PostData[] | undefined
): TextbookStat[] {
  return useMemo(() => {
    if (!rawPosts || rawPosts.length === 0) return [];

    const statsMap = new Map<string, TextbookStat>();

    for (const post of rawPosts) {
      const key = post.textbook.id ?? post.textbook.name;
      const existing = statsMap.get(key);
      if (existing) {
        existing.totalMinutes += Number(post.time);
      } else {
        statsMap.set(key, {
          textbook: post.textbook,
          totalMinutes: Number(post.time),
        });
      }
    }

    return Array.from(statsMap.values()).sort(
      (a, b) => b.totalMinutes - a.totalMinutes
    );
  }, [rawPosts]);
}
