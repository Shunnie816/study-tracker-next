"use client";
import React, { useState } from "react";
import Container from "@mui/material/Container";
import { Selectbox } from "@/components/Atoms/Selectbox";
import styles from "./index.module.scss";
import { SelectChangeEvent } from "@mui/material";

export const Report = () => {
  const [time, setTime] = useState<string>("");
  const [textbook, setTextbook] = useState<string>("");
  const [studyContent, setStudyContent] = useState<string>("");

  const onChangeTime = (event: SelectChangeEvent<string>) => {
    setTime(event.target.value);
  };

  const onChangeTextbook = (event: SelectChangeEvent<string>) => {
    setTextbook(event.target.value);
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
      <Selectbox
        id="studyTime"
        value={time}
        label="学習時間"
        onChange={onChangeTime}
        items={timeData}
        menuItemText="分"
        errorMessage={"学習時間を選択してください"}
      />
      <Selectbox
        id="textbookSelect"
        value={textbook}
        label="教材選択"
        onChange={onChangeTextbook}
        items={textbookData}
        errorMessage={"教材を選択してください"}
      />
    </Container>
  );
};
