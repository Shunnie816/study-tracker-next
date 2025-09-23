import { z } from "zod";

export const formSchema = z.object({
  hour: z.string().min(1, { message: "学習時間（時間）を選択してください" }),
  minute: z.string().min(1, { message: "学習時間（分）を選択してください" }),
  textbook: z.string().min(1, { message: "教材を選択してください" }),
  studyContent: z.string().min(1, { message: "学習内容を入力してください" }),
});

export type ReportData = z.infer<typeof formSchema>;
