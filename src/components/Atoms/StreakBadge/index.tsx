import Chip from "@mui/material/Chip";
import React from "react";

type Props = {
  streak: number;
};

export function StreakBadge({ streak }: Props) {
  return (
    <Chip
      label={`🔥 ${streak}日連続`}
      color="warning"
      size="small"
      sx={{ fontWeight: 600, fontSize: "0.75rem" }}
    />
  );
}
