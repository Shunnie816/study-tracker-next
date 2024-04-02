import React, { FC, useState } from "react";
import { Icon } from "@/components/Atoms/Icon";
import { EditDialog } from "@/components/Molecules/EditDialog";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import styles from "./index.module.scss";

type Props = {
  listData: Array<string>;
};

type ListProps = {
  value: string;
  onClick: () => void;
};

/** TODO: EditDialogが真っ黒になる */
/** TODO: EditDialogの初期値が全部同じ。どのリストアイテムかを識別させる必要がある */
export const RegisteredBook: FC<Props> = ({ listData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const submitEdit = () => {
    alert("教材を保存しました");
    setIsOpen(false);
  };

  const onDelete = () => {
    alert("教材を削除しました");
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <List className={styles.list}>
        {listData.map((value, index) => (
          /** FIXME: textbookのidをkeyにする */
          <React.Fragment key={index}>
            <MUIListItem value={value} onClick={() => setIsOpen(true)} />
            <EditDialog
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onSubmit={submitEdit}
              onDelete={onDelete}
              textBook={value}
            />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

const MUIListItem = ({ value, onClick }: ListProps) => {
  return (
    <ListItem disablePadding>
      <ListItemText>{value}</ListItemText>
      <ListItemSecondaryAction onClick={onClick}>
        <IconButton>
          <Icon icon="edit" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
