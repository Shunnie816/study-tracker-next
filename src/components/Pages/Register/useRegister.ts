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
  const { textbooks, postData } = useTextbookData();

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const TextbookFormMethods = useForm<TextBookData>({
    resolver: zodResolver(textbookForm),
    defaultValues: { textbook: "" },
  });

  const EditTextbookFormMethods = useForm<EditTextBookData>({
    resolver: zodResolver(editForm),
    defaultValues: { textbook: "" },
  });

  const { reset, handleSubmit } = TextbookFormMethods;

  const onSubmitRegister = handleSubmit((data) => {
    /** 教材データを登録 */
    postData({ name: data.textbook });

    /** formの値を初期値に戻す */
    reset();
  });

  const onCloseEditDialog = useCallback(() => {
    setIsEditOpen(false);
  }, []);

  const handleOpenEditDialog = useCallback((id: string) => {
    setIsEditOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    setIsDeleteOpen(false);
    onCloseEditDialog();
  }, [onCloseEditDialog]);

  const onSubmitEdit = useCallback(() => {
    setIsEditOpen(false);
  }, []);

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
