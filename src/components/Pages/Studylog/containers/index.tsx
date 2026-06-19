"use client";
import React from "react";
import { HorizontalBarChart } from "@/components/Organisms/HorizontalBarChart";
import { StatCard } from "@/components/Molecules/StatCard";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { useStudyLog } from "./useStudyLog";
import styles from "./index.module.scss";

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
