"use client";
import { Typography } from "@mui/material";
import React from "react";
import { LoadingWrapper } from "@/components/Atoms/LoadingWrapper";
import { Snackbar } from "@/components/Atoms/Snackbar";
import { PostList } from "@/components/Organisms/PostList";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { usePostData } from "@/libs/hooks/usePostData";
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
      <LoadingWrapper isLoading={isLoading} error={error}>
        {posts && posts.length > 0 ? (
          <PostList
            posts={posts}
            isOpen={isDeleteModalOpen}
            handleOpen={handleOpen}
            onClose={onClose}
            handleDelete={handleDelete}
          />
        ) : (
          <Typography>まだ投稿データがありません。</Typography>
        )}
        <Snackbar
          open={isDeleteSuccess}
          onClose={handleSnackbarClose}
          withAlert
          alertMessage="投稿が削除されました"
          severity="success"
        />
      </LoadingWrapper>
    </SingleColumn>
  );
}
