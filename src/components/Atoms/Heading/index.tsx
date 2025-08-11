import React from "react";
import { Typography } from "@mui/material";

type Props = {
  text: string;
};

export function Heading({ text }: Props) {
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      {text}
    </Typography>
  );
}
