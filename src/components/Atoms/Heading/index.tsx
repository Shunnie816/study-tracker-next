import { Typography } from "@mui/material";
import React from "react";

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
