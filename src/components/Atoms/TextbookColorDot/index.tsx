import Box from "@mui/material/Box";
import React from "react";

type Props = {
  color: string;
  size?: number;
};

export function TextbookColorDot({ color, size = 10 }: Props) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        flexShrink: 0,
      }}
    />
  );
}
