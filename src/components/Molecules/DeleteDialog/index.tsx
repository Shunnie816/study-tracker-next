import React, { FC } from "react";
import { CustomButton } from "@/components/Atoms/CustomButton";
import { Modal } from "@/components/Atoms/Modal";

import styles from "./index.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  deleteTarget: "投稿" | "教材";
};

export const DeleteDialog: FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  deleteTarget,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="削除してよろしいですか？">
      <div className={styles.buttonWrapper}>
        <CustomButton variant="text" onClick={onClose}>
          キャンセル
        </CustomButton>
        <CustomButton variant="outlined" color="error" onClick={onSubmit}>
          {deleteTarget}を削除
        </CustomButton>
      </div>
    </Modal>
  );
};
