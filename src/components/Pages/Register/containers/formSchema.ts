import { z } from "zod";

export const textbookForm = z.object({
  textbook: z.string().min(1, { message: "教材名を入力してください" }),
});

export const editForm = z.object({
  textbook: z.string().min(1, { message: "教材名を入力してください" }),
});

export type TextBookData = z.infer<typeof textbookForm>;
export type EditTextBookData = z.infer<typeof editForm>;
