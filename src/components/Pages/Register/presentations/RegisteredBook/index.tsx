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
import { Textbook } from "@/pages/api/textbook";

type Props = {
  listData: Textbook[];
};

type ListProps = {
  value: string;
  onClick: () => void;
};

/** TODO: EditDialogが真っ黒になる */
/** TODO: EditDialogの初期値が全部同じ。どのリストアイテムかを識別させる必要がある */
export const RegisteredBook: FC<Props> = ({ listData }) => {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});

  const submitEdit = () => {
    alert("教材を保存しました");
    setIsOpen({});
  };

  const onDelete = () => {
    alert("教材を削除しました");
    setIsOpen({});
  };

  return (
    <div className={styles.container}>
      <List className={styles.list}>
        {listData.map((textbook) => (
          <React.Fragment key={textbook.id}>
            <MUIListItem
              value={textbook.name}
              onClick={() => setIsOpen({ [textbook.id]: true })}
            />
            <EditDialog
              isOpen={isOpen[textbook.id]}
              onClose={() => setIsOpen({})}
              onSubmit={submitEdit}
              onDelete={onDelete}
              textbook={textbook.name}
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
