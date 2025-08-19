import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Button } from "@/components/Atoms/Button";
import { Card } from "@/components/Atoms/Card";
import { DeleteDialog } from "@/components/Molecules/DeleteDialog";

import styles from "./index.module.scss";

type Props = {
  date: string;
  textbook: string;
  time: string;
  content: string;
  onDelete: () => void;
};

export function Post({ date, textbook, time, content, onDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const modalOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Card title={date}>
      <div className={styles.wrapper}>
        <Typography variant="subtitle1">教材名：{textbook}</Typography>
        <Typography variant="subtitle1">時間：{time}分</Typography>
      </div>
      <Divider light />
      <div className={styles.contentWrapper}>
        <Typography variant="subtitle2">学習内容：</Typography>
        <Typography variant="body2">{content}</Typography>
      </div>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={modalOpen}
        fullWidth={false}
      >
        投稿を削除
      </Button>
      <DeleteDialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleDelete}
        deleteTarget="投稿"
      />
    </Card>
  );
}
