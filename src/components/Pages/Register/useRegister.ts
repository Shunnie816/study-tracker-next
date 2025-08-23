import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useTextbookData } from "@/libs/hooks/useTextbookData";
import {
  editForm,
  EditTextBookData,
  TextBookData,
  textbookForm,
} from "./formSchema";
export function useRegister() {
  const { textbooks, postData } = useTextbookData();

  const TextbookFormMethods = useForm<TextBookData>({
    resolver: zodResolver(textbookForm),
    defaultValues: { textbook: "" },
  });

  const EditTextbookFormMethods = useForm<EditTextBookData>({
    resolver: zodResolver(editForm),
    defaultValues: { textbook: "" },
  });

  const { reset, handleSubmit } = TextbookFormMethods;

  const onSubmit = handleSubmit((data) => {
    /** 教材IDを生成 */
    const id = uuidv4();

    postData({ id: id, name: data.textbook });

    /** formの値を初期値に戻す */
    reset();
  });

  return {
    TextbookFormMethods,
    EditTextbookFormMethods,
    onSubmit,
    textbooks,
  };
}

export type UseRegister = ReturnType<typeof useRegister>;
