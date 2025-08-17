import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { ListMenu, ListMenuItem } from "./index";

const items: ListMenuItem[] = [
  { label: "記録する", icon: "edit", href: "/study-tracker" },
  { label: "教材登録", icon: "book", href: "/register" },
  { label: "学習記録", icon: "school", href: "/posts" },
  { label: "学習時間", icon: "time", href: "/study-log" },
];

describe("ListMenu", () => {
  it("calls onClick when a menu item is clicked", () => {
    const handleClick = vi.fn();
    render(<ListMenu items={items} onClick={handleClick} />);
    const firstButton = screen.getByText(items[0].label);
    expect(firstButton).toBeTruthy();
    if (firstButton) {
      fireEvent.click(firstButton);
      expect(handleClick).toHaveBeenCalled();
    }
  });
});
