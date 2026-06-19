"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { FilterTabs } from "@/components/Molecules/FilterTabs";
import { LoadingWrapper } from "@/components/Atoms/LoadingWrapper";
import { Snackbar } from "@/components/Atoms/Snackbar";
import { PostList } from "@/components/Organisms/PostList";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { usePosts } from "./usePosts";

export function Posts() {
  const {
    posts,
    isLoading,
    error,
    weeklyTotal,
    activeFilter,
    setActiveFilter,
    isDeleteModalOpen,
    handleOpen,
    onClose,
    handleDelete,
    isDeleteSuccess,
    handleSnackbarClose,
  } = usePosts();

  return (
    <SingleColumn>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          component="h1"
          sx={{ fontSize: "20px", fontWeight: 700, color: "text.primary" }}
        >
          記録
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#EEF1FF",
            borderRadius: "10px",
            px: "12px",
            py: "5px",
          }}
        >
          <Typography
            sx={{ fontSize: "11px", fontWeight: 600, color: "#4361EE" }}
          >
            今週
          </Typography>
          <Typography
            sx={{ fontSize: "13px", fontWeight: 700, color: "#4361EE" }}
          >
            {weeklyTotal}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <FilterTabs value={activeFilter} onChange={setActiveFilter} />
      </Box>
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
          <Typography color="text.secondary">
            {activeFilter === "all"
              ? "まだ投稿データがありません。"
              : "この期間の記録はありません。"}
          </Typography>
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
