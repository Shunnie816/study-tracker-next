import { useCumulativeTotal } from "@/libs/hooks/useCumulativeTotal";
import { usePostData } from "@/libs/hooks/usePostData";
import { useTextbookStats } from "@/libs/hooks/useTextbookStats";
import { useTodayTotal } from "@/libs/hooks/useTodayTotal";
import { useWeeklyTotal } from "@/libs/hooks/useWeeklyTotal";

export function useStudyLog() {
  const { rawPosts, isLoading } = usePostData();

  const todayTotal = useTodayTotal(rawPosts);
  const weeklyTotal = useWeeklyTotal(rawPosts);
  const cumulativeTotal = useCumulativeTotal(rawPosts);
  const textbookStats = useTextbookStats(rawPosts);

  return {
    todayTotal,
    weeklyTotal,
    cumulativeTotal,
    textbookStats,
    isLoading,
  };
}

export type UseStudyLog = ReturnType<typeof useStudyLog>;
