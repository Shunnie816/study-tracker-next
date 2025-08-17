import { describe } from "vitest";
import { formatDate } from ".";

describe("formatDate", () => {
  it("should format date correctly", () => {
    const date = new Date("2023-03-15T12:30:45");
    const result = formatDate(date);
    expect(result).toBe("2023/03/15 12:30:45");
  });
});
