import React, { useState } from "react";
import { PostData } from "@/libs/types";
import { PostList } from "./index";

export default {
  component: PostList,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "PostListは学習報告（posts）の一覧を表示するコンポーネントです。各投稿には教材名・学習時間・内容が含まれ、削除ボタンを押すと確認ダイアログが表示されます。サンプルデータでUIや挙動を確認できます。",
      },
    },
  },
};

const samplePosts: PostData[] = [
  {
    id: "1",
    date: "2025-08-20",
    textbook: { id: "tb1", name: "数学I" },
    time: "60",
    content: "三角関数の基礎を学習しました。",
  },
  {
    id: "2",
    date: "2025-08-19",
    textbook: { id: "tb2", name: "英語長文" },
    time: "45",
    content: "第3章の読解問題を解きました。",
  },
];

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const handleDelete = () => {
    alert("削除しました");
    setIsOpen(false);
  };

  return (
    <PostList
      posts={samplePosts}
      isOpen={isOpen}
      handleOpen={handleOpen}
      onClose={onClose}
      handleDelete={handleDelete}
    />
  );
};
