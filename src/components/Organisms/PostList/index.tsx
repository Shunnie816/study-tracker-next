import React from "react";
import { Post } from "@/components/Molecules/Post";
import { PostData } from "@/pages/api/post";

type Props = {
  posts: PostData[];
};

export function PostList({ posts }: Props) {
  return posts.map((data) => {
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
  });
}
