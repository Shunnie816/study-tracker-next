"use client";
import React from "react";
import { Card } from "@/components/Atoms/Card";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { useStudyLog } from "./useStudyLog";

export function StudyLog() {
  const { data } = useStudyLog();

  return (
    <SingleColumn title="学習時間">
      <Card title="教材別の学習時間" variant="soft-shadow">
        {data ? (
          // data.map((log) => {
          //   return (
          //     /** FIXME: indexを使わないでkeyを入れる */
          //     <dl key={}>
          //       <dt>{}</dt>
          //       <dd>{log.time}分</dd>
          //     </dl>
          //   );
          // })
          <>dataあり</>
        ) : (
          <>学習記録がありません</>
        )}
      </Card>
    </SingleColumn>
  );
}
