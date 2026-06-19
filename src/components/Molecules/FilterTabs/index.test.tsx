import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { FilterTabs } from "./index";

describe("FilterTabs", () => {
  it("「全て」「今週」「今月」の 3 つのタブが表示されるべき", () => {
    render(<FilterTabs value="all" onChange={vi.fn()} />);
    expect(screen.getByText("全て")).toBeInTheDocument();
    expect(screen.getByText("今週")).toBeInTheDocument();
    expect(screen.getByText("今月")).toBeInTheDocument();
  });

  it("アクティブなタブが選択中として表示されるべき", () => {
    render(<FilterTabs value="thisWeek" onChange={vi.fn()} />);
    expect(screen.getByText("今週").closest("button")).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByText("全て").closest("button")).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(screen.getByText("今月").closest("button")).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("別のタブをクリックすると、その value で onChange が呼ばれるべき", () => {
    const onChange = vi.fn();
    render(<FilterTabs value="all" onChange={onChange} />);
    fireEvent.click(screen.getByText("今週"));
    expect(onChange).toHaveBeenCalledWith("thisWeek");
  });
});
