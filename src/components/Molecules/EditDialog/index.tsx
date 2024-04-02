import React, { FC, useCallback, useState } from "react";
import { Button } from "@/components/Atoms/Button";
import { Modal } from "@/components/Atoms/Modal";
import { DeleteDialog } from "../DeleteDialog";
import { TextField } from "@/components/Atoms/TextField";
import styles from "./index.module.scss";
import { Controller, useFormContext } from "react-hook-form";
import { EditTextBookData } from "@/components/Pages/Register/containers/formSchema";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onDelete: () => void;
  textBook: string;
};

export const EditDialog: FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  textBook,
}) => {
  const { control, getValues } = useFormContext<EditTextBookData>();

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const onCloseDeleteDialog = () => {
    setIsDeleteOpen(false);
  };

  const handleDelete = useCallback(() => {
    onDelete();
    setIsDeleteOpen(false);
  }, [onDelete]);

  const handleSubmit = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="教材を編集">
      <form onSubmit={handleSubmit}>
        <div className={styles.textfield}>
          <Controller
            control={control}
            name="textbook"
            render={({ field }) => (
              <TextField
                {...field}
                label="教材名を入力"
                variant="outlined"
                /** TODO: 初期値が設定されていない */
                value={getValues("textbook")}
              />
            )}
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
      </form>
    </Modal>
  );
};
