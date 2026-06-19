import { render } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "vitest";
import { TextbookColorDot } from "./index";

describe("TextbookColorDot", () => {
  it("color を渡したときクラッシュなくレンダリングされるべき", () => {
    const { container } = render(<TextbookColorDot color="#4361EE" />);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("size を指定したときクラッシュなくレンダリングされるべき", () => {
    const { container } = render(<TextbookColorDot color="#06B6D4" size={12} />);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("size を省略したときデフォルト値でレンダリングされるべき", () => {
    const { container } = render(<TextbookColorDot color="#10B981" />);
    expect(container.querySelector("span")).toBeInTheDocument();
  });
});
