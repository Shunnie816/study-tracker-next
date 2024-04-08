import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export type PostData = {
  id: string;
  date: string;
  textbook: string;
  time: string;
  content: string;
};

const posts: PostData[] = [
  {
    id: "1",
    date: "2024/2/1",
    textbook: "typescript",
    time: "20",
    content: "内容",
  },
  {
    id: "2",
    date: "2024/2/1",
    textbook: "Java",
    time: "20",
    content: "内容",
  },
  {
    id: "3",
    date: "2024/2/1",
    textbook: "Next.js",
    time: "20",
    content: "内容",
  },
  {
    id: "4",
    date: "2024/2/1",
    textbook: "React",
    time: "20",
    content: "内容",
  },
  {
    id: "5",
    date: "2024/2/1",
    textbook: "jest",
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
    const { date, textbook, time, content } = req.body;
    const id = uuidv4(); /** UUIDの生成 */
    const newPost: PostData = { id, date, textbook, time, content };
    posts.push(newPost);
    // res.status(201).json(textbooks);
  } else {
    /**TODO: エラーハンドリング記述 */
    // res.status(405).json({});
  }
}
