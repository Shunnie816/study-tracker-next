"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import ReportForm from "@/components/Organisms/ReportForm";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { PostData } from "@/pages/api/post";
import { usePosts } from "../../../../libs/hooks/usePosts";
import { useRegister } from "../../../../libs/hooks/useRegister";
import { ReportData, formSchema } from "./formSchema";
import { formatDate, timeData } from "./utils";

export const Report = () => {
  const { textbooks } = useRegister();
  const { postData } = usePosts();

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
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = methods;

  /** dataをpostDataの型に成形してsubmitする */
  const onSubmit = handleSubmit((data: ReportData) => {
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
        reset();
      })
      .catch((error) => {
        console.error("Error submitting report:", error);
      });
  });

  return (
    <SingleColumn title="学習記録">
      <ReportForm
        methods={methods}
        control={control}
        errors={errors}
        textbooks={textbooks}
        timeData={timeData}
        onSubmit={onSubmit}
      />
    </SingleColumn>
  );
};
