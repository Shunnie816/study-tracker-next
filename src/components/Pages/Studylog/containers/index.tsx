"use client";
import React from "react";
import styles from "./index.module.scss";
import { Heading } from "@/components/Atoms/Heading";
import { Card } from "@/components/Atoms/Card";
import { useStudyLog } from "./useStudyLog";
import { Textbook } from "@/pages/api/textbook";

type LogData = {
  textbook: Textbook;
  time: string;
};

export const StudyLog = () => {
  const { data } = useStudyLog();

  return (
    <div className={styles.container}>
      <Heading text="学習時間" />
      <section className={styles.logWrapper}>
        <Card title="教材別の学習時間">
          {data ? (
            // data.map((log) => {
            //   return (
            //     /** FIXME: indexを使わないでkeyを入れる */
            //     <dl className={styles.list} key={}>
            //       <dt className={styles.dataTitle}>{}</dt>
            //       <dd className={styles.dataDefinition}>{log.time}分</dd>
            //     </dl>
            //   );
            // })
            <>dataあり</>
          ) : (
            <>学習記録がありません</>
          )}
        </Card>
      </section>
    </div>
  );
};
