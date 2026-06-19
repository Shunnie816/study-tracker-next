import Chip from "@mui/material/Chip";
import React from "react";

type Props = {
  time: string;
};

export function TimeBadge({ time }: Props) {
  return (
    <Chip
      label={time}
      size="small"
      color="primary"
      sx={{ fontWeight: 600, fontSize: "0.75rem" }}
    />
  );
}
