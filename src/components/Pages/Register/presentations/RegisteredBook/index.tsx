import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@/components/Atoms/Icon";
import { EditDialog } from "@/components/Molecules/EditDialog";
import { Textbook } from "@/libs/types";
import styles from "./index.module.scss";

type Props = {
  listData: Textbook[];
};

type ListProps = {
  value: string;
  onClick: () => void;
};

export function RegisteredBook({ listData }: Props) {
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
              isOpen={isOpen[textbook.id] || false}
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
}

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
