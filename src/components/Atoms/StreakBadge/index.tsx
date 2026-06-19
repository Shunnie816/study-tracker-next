import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

type Props = {
  streak: number;
};

export function StreakBadge({ streak }: Props) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        backgroundColor: "#FFF8E7",
        border: "1.5px solid rgba(249, 168, 37, 0.3)",
        borderRadius: "20px",
        px: "12px",
        py: "4px",
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          backgroundColor: "#F9A825",
          borderRadius: "50%",
          flexShrink: 0,
        }}
      />
      <Typography
        component="span"
        sx={{ fontSize: "11px", fontWeight: 600, color: "#C67C0E", lineHeight: 1 }}
      >
        {streak}日連続学習中
      </Typography>
    </Box>
  );
}
