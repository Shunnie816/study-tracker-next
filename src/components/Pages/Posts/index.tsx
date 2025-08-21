"use client";
import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Alert } from "@/components/Atoms/Alert";
import { Snackbar } from "@/components/Atoms/Snackbar";
import { PostList } from "@/components/Organisms/PostList";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { usePostData } from "@/libs/hooks/usePostData";
import styles from "./index.module.scss";
import { usePosts } from "./usePosts";

export function Posts() {
  const { posts, isLoading, error } = usePostData();
  const {
    isDeleteModalOpen,
    handleOpen,
    onClose,
    handleDelete,
    isDeleteSuccess,
    handleSnackbarClose,
  } = usePosts();

  return (
    <SingleColumn title={"学習記録一覧"}>
      {isLoading ? (
        <div className={styles.loadingWrapper}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">エラーが発生しました。</Typography>
      ) : posts && posts.length > 0 ? (
        <PostList
          posts={posts}
          isOpen={isDeleteModalOpen}
          handleOpen={handleOpen}
          onClose={onClose}
          handleDelete={handleDelete}
        />
      ) : (
        <Typography>投稿データがありません。</Typography>
      )}
      <Snackbar open={isDeleteSuccess} onClose={handleSnackbarClose}>
        <Alert severity="success" onClose={handleSnackbarClose}>
          投稿が削除されました
        </Alert>
      </Snackbar>
    </SingleColumn>
  );
}
