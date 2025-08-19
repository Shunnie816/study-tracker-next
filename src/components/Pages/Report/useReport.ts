import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePosts } from "@/libs/hooks/usePosts";
import { useRegister } from "@/libs/hooks/useRegister";
import { PostData } from "@/libs/types";
import { formatDate } from "@/libs/utils/formatDate";
import { formSchema, ReportData } from "./formSchema";

export function useReport() {
  const { textbooks } = useRegister();
  const { postData } = usePosts();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const methods = useForm<ReportData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: "",
      textbook: "",
      studyContent: "",
    },
    mode: "onBlur",
  });
  const {
    formState: { errors, isValid, isSubmitting, isDirty },
    control,
    handleSubmit,
    reset,
  } = methods;

  /** 確定ボタンの活性制御 */
  useEffect(() => {
    setIsDisabled(!isValid || isSubmitting);
  }, [isValid, isSubmitting]);

  /** 登録完了のアラートが表示されていて、ユーザーが次の入力を始めたらアラートが消える */
  useEffect(() => {
    if (showAlert) {
      setShowAlert(!isDirty);
    }
  }, [isDirty, showAlert]);

  /** dataをpostDataの型に成形してsubmitする */
  const onSubmit = handleSubmit((data: ReportData) => {
    setShowAlert(false);
    const submitData: PostData = {
      date: "",
      textbook: { id: "", name: "" },
      time: data.time,
      content: data.studyContent,
    };

    /** 日付取得と成形 */
    submitData.date = formatDate(new Date());

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
        setShowAlert(true);
        reset();
      })
      .catch((error) => {
        console.error("Error submitting report:", error);
      });
  });

  /** 時間の仮データ */
  let timeData: Array<string> = [];
  for (let i: number = 5; i <= 180; i += 5) {
    let value: string = i.toString();
    timeData.push(value);
  }

  return {
    methods,
    errors,
    control,
    handleSubmit: onSubmit,
    reset,
    timeData,
    textbooks,
    showAlert,
    setShowAlert,
    isDisabled,
  };
}

export type UseReport = ReturnType<typeof useReport>;
