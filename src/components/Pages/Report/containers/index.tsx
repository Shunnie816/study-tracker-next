"use client";
import React from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Container from "@mui/material/Container";
import styles from "./index.module.scss";
import { Button } from "@/components/Atoms/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReportData, formSchema } from "./formSchema";
import { useRegister } from "../../Register/containers/useRegister";
import { usePosts } from "../../Posts/containers/usePosts";
import { v4 as uuidv4 } from "uuid";
import { formatDate, timeData } from "./utils";
import { PostData } from "@/pages/api/post";
import FormSelect from "@/components/Molecules/FormSelect";
import FormTextField from "@/components/Molecules/FormTextField";

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
    getValues,
    reset,
  } = methods;

  /** dataをpostDataの型に成形してsubmitする */
  const onSubmit: SubmitHandler<ReportData> = (data) => {
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
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formsWrapper}>
            <FormSelect
              name="time"
              control={control}
              options={timeData}
              label="学習時間"
              error={!!errors.time}
              errorMessage={errors.time?.message}
            />
            <FormSelect
              name="textbook"
              control={control}
              options={textbooks}
              valueKey="id"
              labelKey="name"
              label="教材"
              error={!!errors.textbook}
              errorMessage={errors.textbook?.message}
            />
            <FormTextField
              name="studyContent"
              control={control}
              label="学習内容"
              error={!!errors.studyContent}
              errorMessage={errors.studyContent?.message}
            />
          </div>
          <div className={styles.button}>
            <Button variant="contained" type="submit" size="large">
              確定
            </Button>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};
