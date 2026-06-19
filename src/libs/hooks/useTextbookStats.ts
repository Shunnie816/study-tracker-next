import { useMemo } from "react";
import { PostData, TextbookStat } from "../types";

export function useTextbookStats(
  rawPosts: PostData[] | undefined,
  textbookColorMap?: Map<string, string | undefined>
): TextbookStat[] {
  return useMemo(() => {
    if (!rawPosts || rawPosts.length === 0) return [];

    const statsMap = new Map<string, TextbookStat>();

    for (const post of rawPosts) {
      const key = post.textbook.id ?? post.textbook.name;
      const resolvedColor =
        post.textbook.color ??
        (post.textbook.id
          ? textbookColorMap?.get(post.textbook.id)
          : undefined);
      const existing = statsMap.get(key);
      if (existing) {
        existing.totalMinutes += Number(post.time);
      } else {
        statsMap.set(key, {
          textbook: { ...post.textbook, color: resolvedColor },
          totalMinutes: Number(post.time),
        });
      }
    }

    return Array.from(statsMap.values()).sort(
      (a, b) => b.totalMinutes - a.totalMinutes
    );
  }, [rawPosts, textbookColorMap]);
}
