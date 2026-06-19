"use client";
import React from "react";
import { StatCard } from "@/components/Molecules/StatCard";
import { HorizontalBarChart } from "@/components/Organisms/HorizontalBarChart";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import styles from "./index.module.scss";
import { useStudyLog } from "./useStudyLog";

export function StudyLog() {
  const { todayTotal, weeklyTotal, cumulativeTotal, textbookStats, isLoading } =
    useStudyLog();

  return (
    <SingleColumn title="学習統計">
      <div className={styles.statCards}>
        <StatCard label="今日" value={todayTotal} />
        <StatCard label="今週" value={weeklyTotal} />
        <StatCard label="累計" value={cumulativeTotal} />
      </div>
      <HorizontalBarChart stats={textbookStats} isLoading={isLoading} />
    </SingleColumn>
  );
}
