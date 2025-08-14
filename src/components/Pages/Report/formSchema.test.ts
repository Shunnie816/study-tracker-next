import { describe, it, expect } from "vitest";
import { formSchema } from "./formSchema";

// 正常系テスト
const validData = {
  time: "1時間",
  textbook: "教科書A",
  studyContent: "数学の勉強",
};

describe("formSchema", () => {
  it("validates correct data", () => {
    expect(() => formSchema.parse(validData)).not.toThrow();
  });

  it("throws error if time is empty", () => {
    expect(() => formSchema.parse({ ...validData, time: "" })).toThrow(
      "学習時間を選択してください"
    );
  });

  it("throws error if textbook is empty", () => {
    expect(() => formSchema.parse({ ...validData, textbook: "" })).toThrow(
      "教材を選択してください"
    );
  });

  it("throws error if studyContent is empty", () => {
    expect(() => formSchema.parse({ ...validData, studyContent: "" })).toThrow(
      "学習内容を入力してください"
    );
  });
});
