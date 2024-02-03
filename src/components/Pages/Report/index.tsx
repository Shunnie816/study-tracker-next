"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import styles from "./index.module.scss";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { Textfield } from "@/components/Atoms/Textfield";
import { CustomButton } from "@/components/Atoms/CustomButton";
import { SelectboxWithValidation } from "@/components/Atoms/SelectboxWithValidation";

export type ReportData = {
  time: string;
  textbook: string;
  studyContent: string;
};

export const Report = () => {
  const [time, setTime] = useState<string>("");
  const [textbook, setTextbook] = useState<string>("");
  const [studyContent, setStudyContent] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportData>();

  const onSubmit: SubmitHandler<ReportData> = (data) => {
    console.log("onsubmit", data);
    console.log("type of time", typeof data.time);
    console.log("type of textbook", typeof data.textbook);
    setTime("");
    setTextbook("");
    // setStudyContent("");
  };

  // const onChangeTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setTime(event.target.value);
  // };
  const onChangeTime = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formsWrapper}>
          <SelectboxWithValidation
            id="timeSelect"
            value={time}
            label="学習時間"
            onChange={onChangeTime}
            error={errors.time?.message ? true : false}
            errorMessage={errors.time?.message}
          >
            {timeData.map((value, index) => {
              return (
                <MenuItem
                  value={value}
                  key={index}
                  {...register("time", {
                    required: "学習時間を選択してください",
                  })}
                >
                  {value}分
                </MenuItem>
              );
            })}
          </SelectboxWithValidation>
          <SelectboxWithValidation
            id="textbookSelect"
            value={textbook}
            label="教材選択"
            onChange={onChangeTextbook}
            error={errors.textbook?.message ? true : false}
            errorMessage={errors.textbook?.message}
          >
            {textbookData.map((value, index) => {
              return (
                <MenuItem
                  value={value}
                  key={index}
                  {...register("textbook", {
                    required: "教材を選択してください",
                  })}
                >
                  {value}
                </MenuItem>
              );
            })}
          </SelectboxWithValidation>
          {/* <Textfield
          {...register("studyContent", {
            required: "学習内容を入力してください",
          })}
          label="学習内容を入力"
          variant="outlined"
          // value={studyContent}
          onInput={onChangeStudyContent}
          error={errors.studyContent?.message ? true : false}
          errorMessage={errors.studyContent?.message}
        /> */}
        </div>
        <div className={styles.button}>
          <CustomButton variant="contained" type="submit" size="large">
            確定
          </CustomButton>
        </div>
      </form>
    </Container>
  );
};
