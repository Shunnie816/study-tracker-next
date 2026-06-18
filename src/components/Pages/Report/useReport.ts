import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { usePostData } from "@/libs/hooks/usePostData";
import { useTextbookData } from "@/libs/hooks/useTextbookData";
import { ReportData } from "@/libs/types";
import { formSchema, ReportFormData } from "./formSchema";

export function useReport() {
  const { textbooks } = useTextbookData();
  const { postData } = usePostData();

  const [alertShown, setAlertShown] = useState<boolean>(false);

  const methods = useForm<ReportFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hour: "",
      minute: "",
      textbook: "",
      studyContent: "",
    },
    mode: "onChange",
  });
  const {
    formState: { errors, isValid, isSubmitting, isDirty },
    control,
    handleSubmit,
    reset,
  } = methods;

  /** 確定ボタンの活性制御 */
  const isDisabled = !isValid || isSubmitting;

  /** 登録完了のアラートが表示されていて、ユーザーが次の入力を始めたらアラートが消える */
  const showAlert = alertShown && !isDirty;

  /** dataをpostDataの型に成形してsubmitする */
  const onSubmit = handleSubmit((data: ReportFormData) => {
    setAlertShown(false);

    /** 時間を分に変換 */
    const minutes = parseInt(data.hour, 10) * 60 + parseInt(data.minute, 10);
    const submitData: ReportData = {
      textbook: { id: "", name: "" },
      time: minutes,
      content: data.studyContent,
    };

    /** Textbook型に成形 */
    const textbook = textbooks.find((textbook) => {
      return textbook.id === data.textbook;
    });
    if (textbook) {
      submitData.textbook = textbook;
    } else {
      throw new Error("教材が見つかりませんでした");
    }

    postData(submitData)
      .then(() => {
        setAlertShown(true);
        reset();
      })
      .catch((error) => {
        console.error("Error submitting report:", error);
      });
  });

  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString());
  const minuteOptions = Array.from({ length: 12 }, (_, i) =>
    (i * 5).toString()
  );

  return {
    methods,
    errors,
    control,
    onSubmit,
    reset,
    hourOptions,
    minuteOptions,
    textbooks,
    showAlert,
    setShowAlert: setAlertShown,
    isDisabled,
  };
}

export type UseReport = ReturnType<typeof useReport>;
