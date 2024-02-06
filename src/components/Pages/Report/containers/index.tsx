"use client";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import styles from "./index.module.scss";
import { CustomButton } from "@/components/Atoms/CustomButton";
import { TimeSelect } from "../presentations/TimeSelect";
import { TextbookSelect } from "../presentations/TextbookSelect";
import { SelectChangeEvent, TextField } from "@mui/material";

export type ReportData = {
  time: string;
  textbook: string;
  studyContent: string;
};

export const Report = () => {
  const [time, setTime] = useState<string>("");
  const [textbook, setTextbook] = useState<string>("");
  const [studyContent, setStudyContent] = useState<string>("");

  const methods = useForm<ReportData>();
  const {
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<ReportData> = (data) => {
    console.log("onsubmit", data);
    console.log("type of time", typeof data.time);
    console.log("type of textbook", typeof data.textbook);
    setTime("");
    setTextbook("");
    setStudyContent("");
  };

  // const onChangeTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setTime(event.target.value);
  // };
  const onChangeTime = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };

  // const onChangeTextbook = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setTextbook(event.target.value);
  // };
  const onChangeTextbook = (event: SelectChangeEvent<string>) => {
    setTextbook(event.target.value);
  };

  const onChangeStudyContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudyContent(event.target.value);
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
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={styles.formsWrapper}>
            <TimeSelect value={time} onChange={onChangeTime} data={timeData} />
            <TextbookSelect
              value={textbook}
              onChange={onChangeTextbook}
              data={textbookData}
            />
            <TextField
              {...register("studyContent", {
                required: "学習内容を入力してください",
              })}
              label="学習内容を入力"
              variant="outlined"
              value={studyContent}
              //onChangeに変えるべきか？
              onInput={onChangeStudyContent}
              error={errors.studyContent?.message ? true : false}
              helperText={errors.studyContent?.message}
              fullWidth
            />
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
