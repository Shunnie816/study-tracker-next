import { z } from "zod";

export const formSchema = z.object({
  time: z.string().min(1, { message: "学習時間を選択してください" }),
  textbook: z.string().min(1, { message: "教材を選択してください" }),
  studyContent: z.string().min(1, { message: "学習内容を入力してください" }),
});

export type ReportData = z.infer<typeof formSchema>;
