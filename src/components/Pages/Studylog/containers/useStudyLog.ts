import { useMemo } from "react";
import { useCumulativeTotal } from "@/libs/hooks/useCumulativeTotal";
import { usePostData } from "@/libs/hooks/usePostData";
import { useTextbookData } from "@/libs/hooks/useTextbookData";
import { useTextbookStats } from "@/libs/hooks/useTextbookStats";
import { useTodayTotal } from "@/libs/hooks/useTodayTotal";
import { useWeeklyTotal } from "@/libs/hooks/useWeeklyTotal";

export function useStudyLog() {
  const { rawPosts, isLoading } = usePostData();
  const { textbooks } = useTextbookData();

  const textbookColorMap = useMemo(
    () =>
      new Map(
        textbooks
          .filter((t) => t.id !== undefined)
          .map((t) => [t.id as string, t.color])
      ),
    [textbooks]
  );

  const todayTotal = useTodayTotal(rawPosts);
  const weeklyTotal = useWeeklyTotal(rawPosts);
  const cumulativeTotal = useCumulativeTotal(rawPosts);
  const textbookStats = useTextbookStats(rawPosts, textbookColorMap);

  return {
    todayTotal,
    weeklyTotal,
    cumulativeTotal,
    textbookStats,
    isLoading,
  };
}

export type UseStudyLog = ReturnType<typeof useStudyLog>;
