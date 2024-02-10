import React, { FC } from "react";
import { Typography } from "@mui/material";
import styles from "./index.module.scss";

type Props = {
  text: string;
};

/** TODO: 他のサイズとかにも対応させてく */
export const Heading: FC<Props> = ({ text }) => {
  return (
    <Typography
      variant="h4"
      component="h1"
      gutterBottom
      className={styles.container} //サイズ可変に対応させて変数にする styles[XXX]
    >
      {text}
    </Typography>
  );
};
