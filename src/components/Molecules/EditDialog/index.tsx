import React, { FC, useCallback, useState } from "react";
import { Button } from "@/components/Atoms/Button";
import { Modal } from "@/components/Atoms/Modal";
import { DeleteDialog } from "../DeleteDialog";
import { TextField } from "@/components/Atoms/TextField";
import styles from "./index.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onDelete: () => void;
  textBook: string;
  onChange: () => void;
};

export const EditDialog: FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  textBook,
  onChange,
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const onCloseDeleteDialog = () => {
    setIsDeleteOpen(false);
  };

  const handleDelete = useCallback(() => {
    onDelete();
    setIsDeleteOpen(false);
  }, [onDelete]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="教材を編集">
      <div className={styles.textfield}>
        <TextField
          label="教材名を入力"
          variant="outlined"
          onChange={onChange}
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
          onClick={() => setIsDeleteOpen(true)}
          size="small"
        >
          削除
        </Button>
        <DeleteDialog
          isOpen={isDeleteOpen}
          onClose={onCloseDeleteDialog}
          onSubmit={handleDelete}
          deleteTarget="教材"
        />
      </div>
    </Modal>
  );
};
