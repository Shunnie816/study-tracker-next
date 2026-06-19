import MUICard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import styles from "./index.module.scss";

type Props = {
  label: string;
  value: string;
  variant?: "default" | "primary";
};

export function StatCard({ label, value, variant = "default" }: Props) {
  const isPrimary = variant === "primary";
  return (
    <MUICard
      sx={{
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card-soft)",
        border: "none",
        background: isPrimary
          ? "linear-gradient(135deg, #3A0CA3 0%, #4361EE 100%)"
          : "white",
      }}
    >
      <CardContent>
        <div className={styles.container}>
          <Typography
            component="p"
            sx={{
              fontWeight: 700,
              fontSize: "0.9375rem",
              lineHeight: 1.2,
              color: isPrimary ? "white" : "primary.main",
            }}
          >
            {value}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: "0.6875rem",
              color: isPrimary ? "rgba(255,255,255,0.75)" : "text.disabled",
            }}
          >
            {label}
          </Typography>
        </div>
      </CardContent>
    </MUICard>
  );
}
