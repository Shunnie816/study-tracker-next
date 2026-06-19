import { Card as MUICard } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

type CardVariant = "default" | "soft-shadow" | "bordered";

export type Props = {
  children: React.ReactNode;
  title: string;
  variant?: CardVariant;
};

const variantStyles: Record<CardVariant, object> = {
  default: {
    borderRadius: "var(--radius-card)",
  },
  "soft-shadow": {
    borderRadius: "var(--radius-card)",
    boxShadow: "var(--shadow-card-soft)",
    border: "none",
  },
  bordered: {
    borderRadius: "var(--radius-card)",
    boxShadow: "none",
    border: "1px solid var(--mui-palette-divider)",
  },
};

export function Card({ children, title, variant = "default" }: Props) {
  return (
    <MUICard sx={variantStyles[variant]}>
      <CardContent>
        <Typography
          variant="caption"
          gutterBottom
          sx={{
            display: "block",
            color: "text.secondary",
          }}
        >
          {title}
        </Typography>
        {children}
      </CardContent>
    </MUICard>
  );
}
