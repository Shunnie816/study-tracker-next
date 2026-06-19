import Typography from "@mui/material/Typography";
import React from "react";
import { Card } from "@/components/Atoms/Card";
import { TextbookColorDot } from "@/components/Atoms/TextbookColorDot";
import { TextbookStat } from "@/libs/types";
import { formatMinutes } from "@/libs/utils/formatMinutes";
import styles from "./index.module.scss";

type Props = {
  stats: TextbookStat[];
  isLoading?: boolean;
};

export function HorizontalBarChart({ stats, isLoading }: Props) {
  const maxMinutes =
    stats.length > 0 ? Math.max(...stats.map((s) => s.totalMinutes)) : 0;

  return (
    <Card title="教材別の学習時間" variant="soft-shadow">
      {isLoading ? (
        <Typography variant="body2" color="text.secondary">
          読み込み中...
        </Typography>
      ) : stats.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          学習記録がありません
        </Typography>
      ) : (
        <ul className={styles.list}>
          {stats.map((stat) => {
            const pct =
              maxMinutes > 0 ? (stat.totalMinutes / maxMinutes) * 100 : 0;
            const color = stat.textbook.color ?? "#4361EE";
            const key = stat.textbook.id ?? stat.textbook.name;
            return (
              <li key={key} className={styles.row}>
                <div className={styles.label}>
                  <TextbookColorDot color={color} />
                  <Typography variant="body2" noWrap>
                    {stat.textbook.name}
                  </Typography>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.bar}
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={styles.time}
                >
                  {formatMinutes(stat.totalMinutes)}
                </Typography>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
