import { startOfWeek } from "date-fns";
import { useMemo } from "react";
import { PostData } from "../types";

export function useWeeklyTotal(rawPosts: PostData[] | undefined): string {
  return useMemo(() => {
    if (!rawPosts || rawPosts.length === 0) return "0分";

    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

    const totalMinutes = rawPosts
      .filter((post) => {
        const postDate = new Date(post.date.slice(0, 10).replace(/\//g, "-"));
        return postDate >= weekStart;
      })
      .reduce((sum, post) => sum + Number(post.time), 0);

    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    if (hour > 0) {
      return minute > 0 ? `${hour}時間${minute}分` : `${hour}時間`;
    }
    return `${minute}分`;
  }, [rawPosts]);
}
