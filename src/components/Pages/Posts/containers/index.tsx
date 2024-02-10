"use client";
import React from "react";
import styles from "./index.module.scss";
import { Heading } from "@/components/Atoms/Heading";
import { Post } from "@/components/Molecules/Post";

type PostDataType = {
  date: string;
  textbook: string;
  time: string;
  content: string;
};

export const Posts = () => {
  const sampleData: PostDataType[] = [
    { date: "2024/2/1", textbook: "typescript", time: "20", content: "内容" },
    { date: "2024/2/1", textbook: "typescript", time: "20", content: "内容" },
    { date: "2024/2/1", textbook: "typescript", time: "20", content: "内容" },
    { date: "2024/2/1", textbook: "typescript", time: "20", content: "内容" },
    { date: "2024/2/1", textbook: "typescript", time: "20", content: "内容" },
  ];

  return (
    <div className={styles.container}>
      <Heading text="学習記録" />
      <div className={styles.postWrapper}>
        {sampleData.map((data, index) => {
          return (
            <>
              <Post
                date={data.date}
                textbook={data.textbook}
                time={data.time}
                content={data.content}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};
