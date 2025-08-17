import { describe } from "vitest";
import { clns } from "./indext";

describe("clns", () => {
  it("should join class names with a space", () => {
    const result = clns("a", "b", "c");
    expect(result).toBe("a b c");
  });

  it("should filter out falsy values", () => {
    const nullValue = null;
    const result = clns("a", false && "b", nullValue && "c");
    expect(result).toBe("a");
  });
});
