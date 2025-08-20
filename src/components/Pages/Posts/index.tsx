"use client";
import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { PostList } from "@/components/Organisms/PostList";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { usePostData } from "@/libs/hooks/usePostData";
import styles from "./index.module.scss";
import { usePosts } from "./usePosts";

export function Posts() {
  const { posts, isLoading, error } = usePostData();
  const { isOpen, handleOpen, onClose, handleDelete } = usePosts();

  return (
    <SingleColumn title={"学習記録一覧"}>
      {isLoading ? (
        <div className={styles.loadingWrapper}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">エラーが発生しました。</Typography>
      ) : posts ? (
        <PostList
          posts={posts}
          isOpen={isOpen}
          handleOpen={handleOpen}
          onClose={onClose}
          handleDelete={handleDelete}
        />
      ) : (
        <Typography>投稿データがありません。</Typography>
      )}
    </SingleColumn>
  );
}
