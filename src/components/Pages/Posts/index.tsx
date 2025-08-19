"use client";
import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { PostList } from "@/components/Organisms/PostList";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { usePosts } from "@/libs/hooks/usePosts";
import styles from "./index.module.scss";

export function Posts() {
  const { posts, isLoading, error } = usePosts();

  return (
    <SingleColumn title={"学習記録一覧"}>
      <div className={styles.postWrapper}>
        {isLoading ? (
          <div className={styles.loadingWrapper}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error">エラーが発生しました。</Typography>
        ) : posts ? (
          <PostList posts={posts} />
        ) : (
          <Typography>投稿データがありません。</Typography>
        )}
      </div>
    </SingleColumn>
  );
}
