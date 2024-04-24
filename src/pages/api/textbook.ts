import { NextApiRequest, NextApiResponse } from "next";

export type Textbook = {
  id: string;
  name: string;
};

/** 仮のDB */
const textbooks: Textbook[] = [
  { id: "1", name: "typescript" },
  { id: "2", name: "Next.js" },
  { id: "3", name: "React" },
  { id: "4", name: "storybook" },
  { id: "5", name: "tailwind.css" },
];

/** API Routesを使用したエンドポイント */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Textbook[]>
) {
  if (req.method === "GET") {
    res.status(200).json(textbooks);
  } else if (req.method === "POST") {
    const { id, name } = req.body;
    const newTextbook: Textbook = { name, id };
    textbooks.push(newTextbook);
    // res.status(201).json(textbooks);
  } else {
    /**TODO: エラーハンドリング記述 */
    // res.status(405).json({});
  }
}
