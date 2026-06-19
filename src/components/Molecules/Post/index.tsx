import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
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
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {textbook.name}
        </Typography>
        <TimeBadge time={String(time)} />
      </div>
      <Divider sx={{ my: 1 }} />
      <div className={styles.contentWrapper}>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </div>
      <div className={styles.actions}>
        <Button
          size="small"
          onClick={() => handleOpen(id ?? "")}
          startIcon={<Icon icon="delete" fontSize="small" />}
          sx={{
            color: "#E53935",
            border: "1.5px solid #FFE0E0",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 500,
            py: "5px",
            px: "12px",
            "&:hover": {
              border: "1.5px solid #E53935",
              backgroundColor: "#FFF0F0",
            },
          }}
        >
          削除
        </Button>
      </div>
    </Card>
  );
}
