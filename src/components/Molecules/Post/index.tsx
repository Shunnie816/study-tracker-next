import React, { FC } from "react";
import { BaseCard } from "@/components/Atoms/BaseCard";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import styles from "./index.module.scss";

type Props = {
  date: string;
  textbook: string;
  time: string | number;
  content: string;
};

export const Post: FC<Props> = ({ date, textbook, time, content }) => {
  return (
    <BaseCard title={date}>
      <div className={styles.wrapper}>
        <Typography variant="subtitle1">教材名：{textbook}</Typography>
        <Typography variant="subtitle1">時間：{time}分</Typography>
      </div>
      <Divider light />
      <Typography variant="subtitle2">学習内容：</Typography>
      <Typography variant="body2">{content}</Typography>
      {/* <DeleteAlert data={props.data} /> */}
    </BaseCard>
  );
};
