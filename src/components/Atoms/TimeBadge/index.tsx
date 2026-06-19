import Box from "@mui/material/Box";
import React from "react";

type Props = {
  time: string;
};

export function TimeBadge({ time }: Props) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        backgroundColor: "#EEF1FF",
        color: "#4361EE",
        fontSize: "12px",
        fontWeight: 700,
        px: "10px",
        py: "4px",
        borderRadius: "12px",
        flexShrink: 0,
        whiteSpace: "nowrap",
        lineHeight: "normal",
      }}
    >
      {time}
    </Box>
  );
}
