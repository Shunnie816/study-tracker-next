import { SnackbarCloseReason } from "@mui/material";
import { useState } from "react";
import { usePostData } from "@/libs/hooks/usePostData";

export function usePosts() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const { deletePost } = usePostData();
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);

  const handleOpen = (id: string) => {
    setIsDeleteModalOpen(true);
    setDeletePostId(id);
  };

  const onClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsDeleteSuccess(false);
  };

  const handleDelete = async () => {
    if (deletePostId) {
      await deletePost(deletePostId);
      setIsDeleteSuccess(true);
    }
    onClose();
  };
  return {
    isDeleteModalOpen,
    handleOpen,
    onClose,
    handleDelete,
    isDeleteSuccess,
    handleSnackbarClose,
  };
}

export type UsePosts = ReturnType<typeof usePosts>;
