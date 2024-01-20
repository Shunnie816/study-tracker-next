import React, { FC, useState } from "react";
import { CustomButton } from "@/components/Atoms/CustomButton";
import { Modal } from "@/components/Atoms/Modal";

import styles from "./index.module.scss";
import { DeleteDialog } from "../DeleteDialog";
import { Textfield } from "@/components/Atoms/Textfield";

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
        <Textfield
          label="教材名を入力"
          variant="outlined"
          onInput={onInput}
          value={textBook}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <CustomButton variant="text" onClick={onClose} size="small">
          戻る
        </CustomButton>
        <CustomButton variant="outlined" onClick={onSubmit} size="small">
          編集を登録
        </CustomButton>
        <CustomButton
          variant="outlined"
          color="error"
          onClick={onSubmit}
          size="small"
        >
          教材を削除
        </CustomButton>
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
