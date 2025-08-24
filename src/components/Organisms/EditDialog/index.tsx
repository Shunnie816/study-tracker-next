import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Button } from "@/components/Atoms/Button";
import { Modal } from "@/components/Atoms/Modal";
import { DeleteDialog } from "@/components/Molecules/DeleteDialog";
import { EditTextBookData } from "@/components/Pages/Register/formSchema";
import { FormTextField } from "../../Molecules/FormTextField";
import styles from "./index.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isDeleteOpen: boolean;
  onDelete: () => void;
  control: Control<EditTextBookData>;
  errors: FieldErrors<EditTextBookData>;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditDialog({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  isDeleteOpen,
  control,
  errors,
  setIsDeleteOpen,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="教材を編集">
      <form onSubmit={onSubmit}>
        <div className={styles.textfield}>
          <FormTextField
            control={control}
            name="textbook"
            label="教材を入力"
            error={!!errors.textbook}
            errorMessage={errors.textbook?.message}
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
            onClose={() => setIsDeleteOpen(false)}
            onSubmit={onDelete}
            deleteTarget="教材"
          />
        </div>
      </form>
    </Modal>
  );
}
