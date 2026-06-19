import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Icon } from "@/components/Atoms/Icon";
import { LoadingWrapper } from "@/components/Atoms/LoadingWrapper";
import { TextbookColorDot } from "@/components/Atoms/TextbookColorDot";
import { EditDialog } from "@/components/Organisms/EditDialog";
import { EditTextBookData } from "@/components/Pages/Register/formSchema";
import { UseRegister } from "@/components/Pages/Register/useRegister";
import { TEXTBOOK_COLOR_PALETTE } from "@/libs/constants/textbookColors";
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
  color: string;
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
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: "bold",
        }}
      >
        登録済みの教材（{listData.length}件）
      </Typography>
      <LoadingWrapper isLoading={isLoading} error={error}>
        {listData.length > 0 ? (
          <div className={styles.listDataWrapper}>
            <List className={styles.list}>
              {listData.map((textbook, index) => (
                <React.Fragment key={textbook.id}>
                  <MUIListItem
                    value={textbook.name}
                    color={
                      textbook.color ??
                      TEXTBOOK_COLOR_PALETTE[
                        index % TEXTBOOK_COLOR_PALETTE.length
                      ]
                    }
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
      </LoadingWrapper>
    </div>
  );
}

const MUIListItem = ({ value, color, onClick }: ListProps) => {
  return (
    <ListItem disablePadding sx={{ gap: 1.5 }}>
      <TextbookColorDot color={color} size={10} />
      <ListItemText>{value}</ListItemText>
      <ListItemSecondaryAction onClick={onClick}>
        <IconButton>
          <Icon icon="edit" fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
