import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Report } from ".";

/** サンプルテスト */
describe("Report", () => {
  it("renders Report", () => {
    const { container } = render(<Report />);
    expect(container);
  });
});
