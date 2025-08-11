import React, { FC } from "react";
import { Typography } from "@mui/material";

type Props = {
  text: string;
};

/** TODO: 他のサイズとかにも対応させてく */
export const Heading: FC<Props> = ({ text }) => {
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      {text}
    </Typography>
  );
};
