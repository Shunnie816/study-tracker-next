import React, { FC, useState } from "react";
import { BaseCard } from "@/components/Atoms/BaseCard";
import { DeleteDialog } from "@/components/Molecules/DeleteDialog";
import { CustomButton } from "@/components/Atoms/CustomButton";

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
  const [isOpen, setIsOpen] = useState(false);

  const modalOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = () => {
    //削除処理
    onClose();
  };

  return (
    <BaseCard title={date}>
      <div className={styles.wrapper}>
        <Typography variant="subtitle1">教材名：{textbook}</Typography>
        <Typography variant="subtitle1">時間：{time}分</Typography>
      </div>
      <Divider light />
      <div className={styles.contentWrapper}>
        <Typography variant="subtitle2">学習内容：</Typography>
        <Typography variant="body2">{content}</Typography>
      </div>
      <CustomButton
        variant="outlined"
        color="error"
        size="small"
        onClick={modalOpen}
      >
        投稿を削除
      </CustomButton>
      <DeleteDialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        deleteTarget="投稿"
      />
    </BaseCard>
  );
};
