import React, { FC } from "react";
import { CustomButton } from "@/components/Atoms/CustomButton";
import { Modal } from "@/components/Atoms/Modal";

import styles from "./index.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const DeleteDialog: FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="削除してよろしいですか？">
      <div className={styles.buttonWrapper}>
        <CustomButton variant="text" onClick={onClose}>
          キャンセル
        </CustomButton>
        <CustomButton variant="outlined" color="error" onClick={onSubmit}>
          投稿を削除
        </CustomButton>
      </div>
    </Modal>
  );
};
