import React, { FC, useState } from "react";
import { BaseIcon } from "@/components/Atoms/BaseIcon";
import { EditDialog } from "@/components/Molecules/EditDialog";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import styles from "./index.module.scss";
import { useRegister } from "../../containers/useRegister";

type Props = {
  listData: Array<string>;
};

/** TODO: EditDialogが真っ黒になる */
export const RegisteredBook: FC<Props> = ({ listData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { editName, setEditName, handleEdit, submitEdit, onDelete } =
    useRegister();

  return (
    <div className={styles.container}>
      <List className={styles.list}>
        {listData.map((value, index) => (
          <div key={index}>
            <ListItem disablePadding>
              <ListItemText>{value}</ListItemText>
              <ListItemSecondaryAction onClick={() => setIsOpen(true)}>
                <IconButton>
                  <BaseIcon icon="edit" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <EditDialog
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onSubmit={submitEdit}
              onDelete={onDelete}
              textBook={editName}
              onInput={handleEdit}
            />
          </div>
        ))}
      </List>
    </div>
  );
};
