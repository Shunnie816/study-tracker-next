import React from "react";
import { Button } from "@/components/Atoms/Button";
import { Modal } from "@/components/Atoms/Modal";
import styles from "./index.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  deleteTarget: "投稿" | "教材";
};

export function DeleteDialog({
  isOpen,
  onClose,
  onSubmit,
  deleteTarget,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="削除してよろしいですか？">
      <div className={styles.buttonWrapper}>
        <Button variant="text" onClick={onClose}>
          キャンセル
        </Button>
        <Button variant="outlined" color="error" onClick={onSubmit}>
          {deleteTarget}を削除
        </Button>
      </div>
    </Modal>
  );
}
