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
import { Textfield } from "@/components/Atoms/Textfield";

export const Report = () => {
  const methods = useForm<ReportData>({
    resolver: zodResolver(formSchema),
    defaultValues: { time: "", textbook: "", studyContent: "" },
  });
  const {
    formState: { errors },
    control,
    handleSubmit,
    getValues,
    reset,
  } = methods;

  const onSubmit: SubmitHandler<ReportData> = (data) => {
    console.log("onsubmit", data);
    reset();
  };

  /** 時間の仮データ */
  let timeData: Array<string> = [];
  for (let i: number = 5; i <= 180; i += 5) {
    let value: string = i.toString();
    timeData.push(value);
  }

  /** 教材の仮データ */
  const textbookData: Array<string> = [
    "React",
    "Typescript",
    "Next.js",
    "Storybook",
  ];

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
                <Select
                  {...field}
                  label={"教材選択"}
                  value={getValues("textbook")}
                  options={textbookData}
                  error={errors.textbook && true}
                  errorMessage={errors.textbook?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="studyContent"
              render={({ field }) => (
                <Textfield
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
