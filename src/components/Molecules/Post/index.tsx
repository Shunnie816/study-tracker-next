import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React from "react";
import { Button } from "@/components/Atoms/Button";
import { Card } from "@/components/Atoms/Card";

import styles from "./index.module.scss";

type Props = {
  date: string;
  textbook: string;
  time: string;
  content: string;
  handleOpen: () => void;
};

export function Post({ date, textbook, time, content, handleOpen }: Props) {
  return (
    <Card title={date}>
      <div className={styles.wrapper}>
        <Typography variant="subtitle1">教材名：{textbook}</Typography>
        <Typography variant="subtitle1">時間：{time}分</Typography>
      </div>
      <Divider />
      <div className={styles.contentWrapper}>
        <Typography variant="subtitle2">学習内容：</Typography>
        <Typography variant="body2">{content}</Typography>
      </div>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={handleOpen}
        fullWidth={false}
      >
        投稿を削除
      </Button>
    </Card>
  );
}
