import { useMemo } from "react";
import { PostData } from "../types";
import { formatMinutes } from "../utils/formatMinutes";

export function useCumulativeTotal(rawPosts: PostData[] | undefined): string {
  return useMemo(() => {
    if (!rawPosts || rawPosts.length === 0) return "0分";

    const totalMinutes = rawPosts.reduce(
      (sum, post) => sum + Number(post.time),
      0
    );

    return formatMinutes(totalMinutes);
  }, [rawPosts]);
}
