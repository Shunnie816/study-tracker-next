import React from "react";
import { Card as MUICard } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export type Props = {
  children: React.ReactNode;
  title: string;
};

export function Card({ children, title }: Props) {
  return (
    <MUICard>
      <CardContent>
        <Typography
          variant="caption"
          display="block"
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>
        {children}
      </CardContent>
    </MUICard>
  );
}
