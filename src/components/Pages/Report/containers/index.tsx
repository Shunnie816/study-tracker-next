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
import { Select } from "@/components/Atoms/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReportData, formSchema } from "./formSchema";
import { TextField } from "@/components/Atoms/TextField";
import { useRegister } from "../../Register/containers/useRegister";
import { TextbookSelect } from "../presentations/TextbookSelect";
import { usePosts } from "../../Posts/containers/usePosts";
import { v4 as uuidv4 } from "uuid";
import { formatDate, timeData } from "./utils";
import { PostData } from "@/pages/api/post";

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

    /** formSchemaをデフォルト値に戻す */
    reset();
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formsWrapper}>
            <Controller
              control={control}
              name="time"
              render={({ field }) => (
                <Select
                  {...field}
                  label={"学習時間"}
                  value={getValues("time")}
                  options={timeData}
                  error={errors.time && true}
                  errorMessage={errors.time?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="textbook"
              render={({ field }) => (
                <TextbookSelect
                  {...field}
                  label={"教材選択"}
                  value={getValues("textbook")}
                  options={textbooks ?? []}
                  error={errors.textbook && true}
                  errorMessage={errors.textbook?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="studyContent"
              render={({ field }) => (
                <TextField
                  {...field}
                  label={"学習内容を入力"}
                  value={getValues("studyContent")}
                  error={errors.studyContent && true}
                  errorMessage={errors.studyContent?.message}
                />
              )}
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
