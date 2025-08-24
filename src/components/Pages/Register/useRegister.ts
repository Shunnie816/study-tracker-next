import { zodResolver } from "@hookform/resolvers/zod";
import { SnackbarCloseReason } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTextbookData } from "@/libs/hooks/useTextbookData";
import {
  editForm,
  EditTextBookData,
  TextBookData,
  textbookForm,
} from "./formSchema";
export function useRegister() {
  const {
    textbooks,
    registerTextbook,
    editTextbook,
    deleteTextbook,
    isLoading,
    error,
  } = useTextbookData();

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [editTargetId, setEditTargetId] = useState<string>("");
  const [showRegisterAlert, setShowRegisterAlert] = useState<boolean>(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [isEditSuccess, setIsEditSuccess] = useState<boolean>(false);
  const [isEditDisabled, setIsEditDisabled] = useState<boolean>(false);

  const TextbookFormMethods = useForm<TextBookData>({
    resolver: zodResolver(textbookForm),
    defaultValues: { textbook: "" },
  });

  const EditTextbookFormMethods = useForm<EditTextBookData>({
    resolver: zodResolver(editForm),
    defaultValues: { textbook: "" },
  });

  /** 登録完了のアラートが表示されていて、ユーザーが次の入力を始めたらアラートが消える */
  useEffect(() => {
    if (showRegisterAlert) {
      const hasNextInput =
        TextbookFormMethods.formState.isDirty ||
        TextbookFormMethods.formState.errors.textbook;
      setShowRegisterAlert(!hasNextInput);
    }
  }, [
    TextbookFormMethods.formState.isDirty,
    TextbookFormMethods.formState.errors.textbook,
    showRegisterAlert,
  ]);

  /** 編集ダイアログが開いたら、アラートをすべて消す(編集後や削除後にも登録完了アラートが出続けるのを防止) */
  useEffect(() => {
    if (isEditOpen) {
      setShowRegisterAlert(false);
      setIsDeleteSuccess(false);
      setIsEditSuccess(false);
    }
  }, [isEditOpen]);

  useEffect(() => {
    setIsEditDisabled(
      !EditTextbookFormMethods.formState.isValid ||
        EditTextbookFormMethods.formState.isSubmitting ||
        !EditTextbookFormMethods.formState.isDirty
    );
  }, [EditTextbookFormMethods.formState]);

  /** 教材を登録 */
  const onSubmitRegister = TextbookFormMethods.handleSubmit(async (data) => {
    /** 教材データを登録 */
    await registerTextbook({ name: data.textbook });
    setShowRegisterAlert(true);
    console.log("教材登録完了", showRegisterAlert);

    /** formの値を初期値に戻す */
    TextbookFormMethods.reset();
  });

  const onCloseEditDialog = useCallback(() => {
    setIsEditOpen(false);
    /** formの値を初期値に戻す(エラーも消す) */
    EditTextbookFormMethods.reset();
  }, [EditTextbookFormMethods]);

  const handleOpenEditDialog = useCallback(
    (id: string) => {
      setEditTargetId(id);

      /** 編集ダイアログの初期値を設定 */
      EditTextbookFormMethods.setValue(
        "textbook",
        textbooks.find((t) => t.id === id)?.name || ""
      );
      setIsEditOpen(true);
    },
    [EditTextbookFormMethods, textbooks]
  );

  /** 教材データの削除 */
  const handleDelete = useCallback(() => {
    if (!editTargetId) {
      return;
    }
    /** 教材データを削除 */
    deleteTextbook(editTargetId);
    setIsDeleteSuccess(true);

    setIsDeleteOpen(false);
    onCloseEditDialog();
  }, [deleteTextbook, editTargetId, onCloseEditDialog]);

  /** 教材データの編集 */
  const onSubmitEdit = EditTextbookFormMethods.handleSubmit((data) => {
    if (!editTargetId) {
      return;
    }
    /** 教材データを更新 */
    editTextbook(editTargetId, { name: data.textbook });
    setIsEditSuccess(true);

    setIsEditOpen(false);

    /** formの値を初期値に戻す */
    EditTextbookFormMethods.reset();
  });

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsDeleteSuccess(false);
    setIsEditSuccess(false);
  };

  return {
    TextbookFormMethods,
    EditTextbookFormMethods,
    onSubmitRegister,
    onSubmitEdit,
    handleDelete,
    isDeleteOpen,
    isEditOpen,
    onCloseEditDialog,
    setIsDeleteOpen,
    handleOpenEditDialog,
    textbooks,
    showRegisterAlert,
    setShowRegisterAlert,
    isDeleteSuccess,
    handleSnackbarClose,
    isEditSuccess,
    isEditDisabled,
    isLoading,
    error,
  };
}

export type UseRegister = ReturnType<typeof useRegister>;
