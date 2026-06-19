import { SnackbarCloseReason } from "@mui/material";
import { startOfMonth, startOfWeek } from "date-fns";
import { useMemo, useState } from "react";
import { FilterType } from "@/components/Molecules/FilterTabs";
import { TEXTBOOK_COLOR_PALETTE } from "@/libs/constants/textbookColors";
import { usePostData } from "@/libs/hooks/usePostData";
import { useTextbookData } from "@/libs/hooks/useTextbookData";
import { useWeeklyTotal } from "@/libs/hooks/useWeeklyTotal";
import { PostData } from "@/libs/types";

function filterByDate(posts: PostData[], filter: FilterType): PostData[] {
  if (filter === "all") return posts;

  const cutoff =
    filter === "thisWeek"
      ? startOfWeek(new Date(), { weekStartsOn: 1 })
      : startOfMonth(new Date());

  return posts.filter((post) => {
    const postDate = new Date(post.date.slice(0, 10).replace(/\//g, "-"));
    return postDate >= cutoff;
  });
}

export function usePosts() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const { posts, rawPosts, isLoading, error, deletePost } = usePostData();
  const { textbooks } = useTextbookData();

  const weeklyTotal = useWeeklyTotal(rawPosts);

  const textbookColorMap = useMemo(
    () =>
      new Map(
        textbooks
          .filter((t) => t.id !== undefined)
          .map((t, index) => [
            t.id as string,
            t.color ??
              TEXTBOOK_COLOR_PALETTE[index % TEXTBOOK_COLOR_PALETTE.length],
          ])
      ),
    [textbooks]
  );

  const filteredPosts = useMemo(() => {
    const filtered = filterByDate(posts ?? [], activeFilter);
    return filtered.map((post) => ({
      ...post,
      textbook: {
        ...post.textbook,
        color:
          post.textbook.color ??
          (post.textbook.id
            ? textbookColorMap.get(post.textbook.id)
            : undefined) ??
          TEXTBOOK_COLOR_PALETTE[0],
      },
    }));
  }, [posts, activeFilter, textbookColorMap]);

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
    posts: filteredPosts,
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
  };
}

export type UsePosts = ReturnType<typeof usePosts>;
