import React from "react";
import styles from "./index.module.scss";
import { Heading } from "@/components/Atoms/Heading";
import { BaseCard } from "@/components/Atoms/BaseCard";

type LogDataType = {
  textbook: string;
  time: string;
};

export const StudyLog = () => {
  const sampleData: LogDataType[] = [
    { textbook: "Typescript", time: "30" },
    { textbook: "Typescript", time: "30" },
    { textbook: "Typescript", time: "30" },
    { textbook: "Typescript", time: "30" },
    { textbook: "Typescript", time: "30" },
    { textbook: "Typescript", time: "30" },
  ];

  return (
    <div className={styles.container}>
      <Heading text="学習時間" />
      <section className={styles.logWrapper}>
        <BaseCard title="教材別の学習時間">
          {sampleData.map((data, index) => {
            return (
              <dl className={styles.list} key={index}>
                <dt className={styles.dataTitle}>{data.textbook}</dt>
                <dd className={styles.dataDefinition}>{data.time}分</dd>
              </dl>
            );
          })}
        </BaseCard>
      </section>
    </div>
  );
};
