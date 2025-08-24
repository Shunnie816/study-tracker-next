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
  const { textbooks, registerTextbook, editTextbook } = useTextbookData();

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

  const onSubmitRegister = TextbookFormMethods.handleSubmit((data) => {
    /** 教材データを登録 */
    registerTextbook({ name: data.textbook });

    /** formの値を初期値に戻す */
    TextbookFormMethods.reset();
  });

  const onCloseEditDialog = useCallback(() => {
    setIsEditOpen(false);
  }, []);

  const handleOpenEditDialog = useCallback((id: string) => {
    setEditTargetId(id);
    setIsEditOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    setIsDeleteOpen(false);
    onCloseEditDialog();
  }, [onCloseEditDialog]);

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
