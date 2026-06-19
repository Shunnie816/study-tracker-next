import { format } from "date-fns";
import { useMemo } from "react";
import { PostData } from "../types";
import { formatMinutes } from "../utils/formatMinutes";

export function useTodayTotal(rawPosts: PostData[] | undefined): string {
  return useMemo(() => {
    if (!rawPosts || rawPosts.length === 0) return "0分";

    const todayPrefix = format(new Date(), "yyyy/MM/dd");

    const totalMinutes = rawPosts
      .filter((post) => post.date.startsWith(todayPrefix))
      .reduce((sum, post) => sum + Number(post.time), 0);

    return formatMinutes(totalMinutes);
  }, [rawPosts]);
}
