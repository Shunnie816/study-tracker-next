import { describe, it, expect } from "vitest";
import { formSchema } from "./formSchema";

// 正常系テスト
const validData = {
  hour: "1",
  minute: "30",
  textbook: "教科書A",
  studyContent: "数学の勉強",
};

describe("formSchema", () => {
  it("validates correct data", () => {
    expect(() => formSchema.parse(validData)).not.toThrow();
  });

  it("throws error if hour is empty", () => {
    expect(() => formSchema.parse({ ...validData, hour: "" })).toThrow(
      "学習時間（時間）を選択してください"
    );
  });

  it("throws error if minute is empty", () => {
    expect(() => formSchema.parse({ ...validData, minute: "" })).toThrow(
      "学習時間（分）を選択してください"
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
