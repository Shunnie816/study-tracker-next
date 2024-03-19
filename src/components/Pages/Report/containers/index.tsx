"use client";
import React, { useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Container from "@mui/material/Container";
import styles from "./index.module.scss";
import { CustomButton } from "@/components/Atoms/CustomButton";
import { Selectbox } from "@/components/Atoms/Selectbox";
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
                <Selectbox
                  {...field}
                  label={"学習時間"}
                  value={getValues("time")}
                  options={timeData}
                />
              )}
            />
            {errors.time && <p>{errors.time?.message}</p>}
            <Controller
              control={control}
              name="textbook"
              render={({ field }) => (
                <Selectbox
                  {...field}
                  label={"教材選択"}
                  value={getValues("textbook")}
                  options={textbookData}
                />
              )}
            />
            {errors.textbook && <p>{errors.textbook.message}</p>}

            <Controller
              control={control}
              name="studyContent"
              render={({ field }) => (
                <Textfield
                  {...field}
                  label={"学習内容を入力"}
                  value={getValues("studyContent")}
                />
              )}
            />
            {errors.studyContent && <p>{errors.studyContent.message}</p>}
          </div>
          <div className={styles.button}>
            <CustomButton variant="contained" type="submit" size="large">
              確定
            </CustomButton>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};
