import {
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Icon } from "@/components/Atoms/Icon";
import { EditDialog } from "@/components/Organisms/EditDialog";
import { EditTextBookData } from "@/components/Pages/Register/formSchema";
import { UseRegister } from "@/components/Pages/Register/useRegister";
import { Textbook } from "@/libs/types";
import styles from "./index.module.scss";

type Props = {
  listData: Textbook[];
} & Pick<
  UseRegister,
  | "onSubmitEdit"
  | "handleDelete"
  | "isDeleteOpen"
  | "isEditOpen"
  | "onCloseEditDialog"
  | "handleOpenEditDialog"
  | "setIsDeleteOpen"
  | "isEditDisabled"
  | "isLoading"
  | "error"
>;

type ListProps = {
  value: string;
  onClick: () => void;
};

export function RegisteredBook({
  listData,
  onSubmitEdit,
  handleDelete,
  isDeleteOpen,
  isEditOpen,
  onCloseEditDialog,
  handleOpenEditDialog,
  setIsDeleteOpen,
  isEditDisabled,
  isLoading,
  error,
}: Props) {
  return (
    <div className={styles.container}>
      <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
        登録済みの教材
      </Typography>
      {isLoading ? (
        <div className={styles.loadingWrapper}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">
          データ取得中にエラーが発生しました。
        </Typography>
      ) : (
        <div className={styles.listContainer}>
          {listData.length > 0 ? (
            <div className={styles.listDataWrapper}>
              <List className={styles.list}>
                {listData.map((textbook) => (
                  <React.Fragment key={textbook.id}>
                    <MUIListItem
                      value={textbook.name}
                      onClick={() => handleOpenEditDialog(textbook.id!)}
                    />
                  </React.Fragment>
                ))}
              </List>
              <EditDialog<EditTextBookData>
                name="textbook"
                label={"教材名"}
                isOpen={isEditOpen}
                onClose={onCloseEditDialog}
                onSubmit={onSubmitEdit}
                onDelete={handleDelete}
                isDeleteOpen={isDeleteOpen}
                setIsDeleteOpen={setIsDeleteOpen}
                isEditDisabled={isEditDisabled}
              />
            </div>
          ) : (
            <Typography>登録された教材がありません</Typography>
          )}
        </div>
      )}
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
