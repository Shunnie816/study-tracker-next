import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTextbookData } from "@/libs/hooks/useTextbookData";
import {
  editForm,
  EditTextBookData,
  TextBookData,
  textbookForm,
} from "./formSchema";
export function useRegister() {
  const { textbooks, registerTextbook, editTextbook, deleteTextbook } =
    useTextbookData();

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [editTargetId, setEditTargetId] = useState<string>("");

  const TextbookFormMethods = useForm<TextBookData>({
    resolver: zodResolver(textbookForm),
    defaultValues: { textbook: "" },
  });

  const EditTextbookFormMethods = useForm<EditTextBookData>({
    resolver: zodResolver(editForm),
    defaultValues: { textbook: "" },
  });

  /** 教材を登録 */
  const onSubmitRegister = TextbookFormMethods.handleSubmit((data) => {
    /** 教材データを登録 */
    registerTextbook({ name: data.textbook });

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
    setIsEditOpen(false);

    /** formの値を初期値に戻す */
    EditTextbookFormMethods.reset();
  });

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
  };
}

export type UseRegister = ReturnType<typeof useRegister>;
