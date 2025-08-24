import React from "react";
import { FieldValues, useFormContext, Path } from "react-hook-form";
import { Button } from "@/components/Atoms/Button";
import { Modal } from "@/components/Atoms/Modal";
import { DeleteDialog } from "@/components/Molecules/DeleteDialog";
import { FormTextField } from "../../Molecules/FormTextField";
import styles from "./index.module.scss";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isDeleteOpen: boolean;
  onDelete: () => void;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditDialog<T extends FieldValues>({
  name,
  label,
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  isDeleteOpen,
  setIsDeleteOpen,
}: Props<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${label}を編集`}>
      <form onSubmit={onSubmit}>
        <div className={styles.textfield}>
          <FormTextField<T>
            control={control}
            name={name}
            label={`${label}を入力`}
            error={!!errors[name]}
            errorMessage={errors[name]?.message as string}
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
          />
        </div>
      </form>
    </Modal>
  );
}
