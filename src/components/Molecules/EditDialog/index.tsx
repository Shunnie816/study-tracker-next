import React, { FC, useState } from "react";
import { Button } from "@/components/Atoms/Button";
import { Modal } from "@/components/Atoms/Modal";

import styles from "./index.module.scss";
import { DeleteDialog } from "../DeleteDialog";
import { TextField } from "@/components/Atoms/TextField";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onDelete: () => void;
  textBook: string;
  onInput: React.ChangeEventHandler<HTMLInputElement>;
};

export const EditDialog: FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  textBook,
  onInput,
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const onCloseDeleteDialog = () => {
    setIsDeleteOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="教材を編集">
      <div className={styles.textfield}>
        <TextField
          label="教材名を入力"
          variant="outlined"
          onInput={onInput}
          value={textBook}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button variant="text" onClick={onClose} size="small">
          戻る
        </Button>
        <Button variant="outlined" onClick={onSubmit} size="small">
          保存
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={onSubmit}
          size="small"
        >
          削除
        </Button>
        <DeleteDialog
          isOpen={isDeleteOpen}
          onClose={onCloseDeleteDialog}
          onSubmit={onDelete}
          deleteTarget="教材"
        />
      </div>
    </Modal>
  );
};
