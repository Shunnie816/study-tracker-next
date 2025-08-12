"use client";
import React from "react";
import styles from "./index.module.scss";
import { Heading } from "@/components/Atoms/Heading";
import { Post } from "@/components/Molecules/Post";
import { usePosts } from "../../../../libs/hooks/usePosts";

export const Posts = () => {
  const { posts, postData } = usePosts();

  return (
    <div className={styles.container}>
      <Heading text="学習記録" />
      <div className={styles.postWrapper}>
        {posts ? (
          posts.map((data) => {
            return (
              <React.Fragment key={data.id}>
                <Post
                  date={data.date}
                  textbook={data.textbook.name}
                  time={data.time}
                  content={data.content}
                  onDelete={() => {}}
                />
              </React.Fragment>
            );
          })
        ) : (
          <>投稿データがありません。</>
        )}
      </div>
    </div>
  );
};
