import { describe, it, expect } from "vitest";
import { textbookForm, editForm } from "./formSchema";

describe("textbookForm", () => {
  it("validates correct textbook name", () => {
    expect(() => textbookForm.parse({ textbook: "教科書A" })).not.toThrow();
  });

  it("throws error if textbook name is empty", () => {
    expect(() => textbookForm.parse({ textbook: "" })).toThrow(
      "教材名を入力してください"
    );
  });
});

describe("editForm", () => {
  it("validates correct textbook name", () => {
    expect(() => editForm.parse({ textbook: "教科書B" })).not.toThrow();
  });

  it("throws error if textbook name is empty", () => {
    expect(() => editForm.parse({ textbook: "" })).toThrow(
      "教材名を入力してください"
    );
  });
});
