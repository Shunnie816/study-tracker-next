import { NextApiRequest, NextApiResponse } from "next";
import { Textbook } from "./textbook";

export type PostData = {
  id: string;
  date: string;
  textbook: Textbook;
  time: string;
  content: string;
};

const posts: PostData[] = [
  {
    id: "1",
    date: "2024/2/1",
    textbook: { id: "1", name: "typescript" },
    time: "20",
    content: "内容",
  },
  {
    id: "2",
    date: "2024/2/1",
    textbook: { id: "2", name: "Next.js" },
    time: "20",
    content: "内容",
  },
  {
    id: "3",
    date: "2024/2/1",
    textbook: { id: "3", name: "React" },
    time: "20",
    content: "内容",
  },
  {
    id: "4",
    date: "2024/2/1",
    textbook: { id: "4", name: "storybook" },
    time: "20",
    content: "内容",
  },
  {
    id: "5",
    date: "2024/2/1",
    textbook: { id: "5", name: "tailwind.css" },
    time: "20",
    content: "内容",
  },
];

/** API Routesを使用したエンドポイント */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostData[]>
) {
  if (req.method === "GET") {
    res.status(200).json(posts);
  } else if (req.method === "POST") {
    const { id, date, textbook, time, content } = req.body;
    const newPost: PostData = { id, date, textbook, time, content };
    posts.push(newPost);
    // res.status(201).json(textbooks);
  } else {
    /**TODO: エラーハンドリング記述 */
    // res.status(405).json({});
  }
}
