import React from "react";
import styles from "./index.module.scss";
import { Heading } from "@/components/Atoms/Heading";

export const StudyLog = () => {
  return (
    <div className={styles.container}>
      <Heading text="学習時間" />
    </div>
  );
};
