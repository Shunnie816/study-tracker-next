"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import styles from "./index.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReportData, formSchema } from "./formSchema";
import { useRegister } from "../../Register/containers/useRegister";
import { usePosts } from "../../Posts/containers/usePosts";
import { v4 as uuidv4 } from "uuid";
import { formatDate, timeData } from "./utils";
import { PostData } from "@/pages/api/post";
import ReportForm from "@/components/Organisms/ReportForm";

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
      id: "",
      date: "",
      textbook: { id: "", name: "" },
      time: data.time,
      content: data.studyContent,
    };

    /** UUIDの生成 */
    submitData.id = uuidv4();

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

    postData(submitData);
    console.log("Submitted Data:", submitData);

    /** formSchemaをデフォルト値に戻す */
    reset();
  });

  return (
    <Container maxWidth="sm" className={styles.container}>
      <ReportForm
        methods={methods}
        control={control}
        errors={errors}
        textbooks={textbooks}
        timeData={timeData}
        onSubmit={onSubmit}
      />
    </Container>
  );
};
