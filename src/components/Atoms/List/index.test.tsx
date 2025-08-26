import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, vi } from "vitest";
import { List } from "./index";

const items: string[] = ["Item 1", "Item 2", "Item 3"];

describe("List", () => {
  it("calls onClick when an item is clicked", () => {
    const handleClick = vi.fn();
    render(<List onClick={handleClick} icon items={items} />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
