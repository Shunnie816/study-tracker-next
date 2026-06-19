import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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

type TextbookItemProps = {
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "10px",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: 700, color: "text.primary" }}
        >
          登録済みの教材
        </Typography>
        <Box
          component="span"
          sx={{
            background: "#EEF1FF",
            color: "#4361EE",
            fontSize: "10px",
            fontWeight: 700,
            px: "7px",
            py: "2px",
            borderRadius: "10px",
          }}
        >
          {listData.length}件
        </Box>
      </Box>
      <LoadingWrapper isLoading={isLoading} error={error}>
        {listData.length > 0 ? (
          <div className={styles.listDataWrapper}>
            <div className={styles.list}>
              {listData.map((textbook, index) => (
                <TextbookItem
                  key={textbook.id}
                  value={textbook.name}
                  color={
                    textbook.color ??
                    TEXTBOOK_COLOR_PALETTE[
                      index % TEXTBOOK_COLOR_PALETTE.length
                    ]
                  }
                  onClick={() => handleOpenEditDialog(textbook.id!)}
                />
              ))}
            </div>
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

const TextbookItem = ({ value, color, onClick }: TextbookItemProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 14px",
        background: "white",
        border: "1.5px solid #E2E4F0",
        borderRadius: "12px",
      }}
    >
      <TextbookColorDot color={color} size={8} />
      <Typography
        sx={{
          flex: 1,
          fontSize: "13px",
          fontWeight: 500,
          color: "text.primary",
        }}
      >
        {value}
      </Typography>
      <IconButton
        onClick={onClick}
        size="small"
        sx={{
          background: "#F5F6FC",
          borderRadius: "6px",
          width: "28px",
          height: "28px",
          "&:hover": { background: "#E2E4F0" },
        }}
      >
        <Icon icon="edit" fontSize="small" />
      </IconButton>
    </Box>
  );
};
