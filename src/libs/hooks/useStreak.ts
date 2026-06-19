import { format, subDays } from "date-fns";
import { useMemo } from "react";
import { PostData } from "../types";

function calculateStreak(posts: PostData[] | undefined): number {
  if (!posts || posts.length === 0) return 0;

  // Extract unique dates (first 10 chars: "yyyy/MM/dd") sorted descending
  const uniqueDates = [...new Set(posts.map((p) => p.date.slice(0, 10)))].sort(
    (a, b) => b.localeCompare(a)
  );

  const today = new Date();
  const todayStr = format(today, "yyyy/MM/dd");

  // If today has no record, start counting from yesterday
  let checkDate = uniqueDates.includes(todayStr) ? today : subDays(today, 1);
  let streak = 0;

  for (const dateStr of uniqueDates) {
    const checkStr = format(checkDate, "yyyy/MM/dd");
    if (dateStr === checkStr) {
      streak++;
      checkDate = subDays(checkDate, 1);
    } else if (dateStr < checkStr) {
      // Gap in consecutive days — stop counting
      break;
    }
  }

  return streak;
}

export function useStreak(posts: PostData[] | undefined): number {
  return useMemo(() => calculateStreak(posts), [posts]);
}
