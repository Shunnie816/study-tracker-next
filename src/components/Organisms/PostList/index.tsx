import React from "react";
import { DeleteDialog } from "@/components/Molecules/DeleteDialog";
import { Post } from "@/components/Molecules/Post";
import { PostData } from "@/libs/types";
import styles from "./index.module.scss";

type Props = {
  posts: PostData[];
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  handleOpen: (id: string) => void;
  onClose: () => void;
  handleDelete: () => void;
};

export function PostList({
  posts,
  isOpen,
  handleOpen,
  onClose,
  handleDelete,
}: Props) {
  return (
    <div className={styles.postWrapper}>
      {posts.map((data) => {
        return (
          <React.Fragment key={data.id}>
            <Post
              id={data.id!}
              date={data.date}
              textbook={data.textbook.name}
              time={data.time}
              content={data.content}
              handleOpen={handleOpen}
            />
          </React.Fragment>
        );
      })}
      <DeleteDialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleDelete}
        deleteTarget="投稿"
      />
    </div>
  );
}
