import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { Card } from "@/components/Atoms/Card";
import { Icon } from "@/components/Atoms/Icon";
import { TimeBadge } from "@/components/Atoms/TimeBadge";
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
    <Card title={date} variant="bordered">
      <div className={styles.wrapper}>
        <Typography variant="subtitle1">{textbook.name}</Typography>
        <TimeBadge time={String(time)} />
      </div>
      <Divider sx={{ my: 1 }} />
      <div className={styles.contentWrapper}>
        <Typography variant="subtitle2">学習内容：</Typography>
        <Typography variant="body2">{content}</Typography>
      </div>
      <div className={styles.actions}>
        <IconButton
          size="small"
          color="error"
          onClick={() => handleOpen(id ?? "")}
          aria-label="投稿を削除"
        >
          <Icon icon="delete" fontSize="small" />
        </IconButton>
      </div>
    </Card>
  );
}
