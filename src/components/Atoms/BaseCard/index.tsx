import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export type Props = {
  children: React.ReactNode;
  title: string;
};

export const BaseCard: FC<Props> = ({ children, title }) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};
