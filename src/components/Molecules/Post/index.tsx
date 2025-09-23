import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React from "react";
import { Button } from "@/components/Atoms/Button";
import { Card } from "@/components/Atoms/Card";
import { PostData } from "@/libs/types";
import styles from "./index.module.scss";

type Props = {
  data: PostData;
  // eslint-disable-next-line no-unused-vars
  handleOpen: (id: string) => void;
};

export function Post({ data, handleOpen }: Props) {
  const { id, date, textbook, time, content } = data;
  return (
    <Card title={date}>
      <div className={styles.wrapper}>
        <Typography variant="subtitle1">教材名　：{textbook.name}</Typography>
        <Typography variant="subtitle1">学習時間：{time}</Typography>
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
        onClick={() => handleOpen(id ?? "")}
        fullWidth={false}
      >
        投稿を削除
      </Button>
    </Card>
  );
}
