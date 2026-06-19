import Typography from "@mui/material/Typography";
import React from "react";
import { Card } from "@/components/Atoms/Card";
import styles from "./index.module.scss";

type Props = {
  label: string;
  value: string;
};

export function StatCard({ label, value }: Props) {
  return (
    <Card variant="soft-shadow">
      <div className={styles.container}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="text.primary"
          sx={{ fontWeight: 700 }}
        >
          {value}
        </Typography>
      </div>
    </Card>
  );
}
