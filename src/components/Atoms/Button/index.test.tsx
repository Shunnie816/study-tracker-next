import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./index";

describe("Button", () => {
  it("renders children", () => {
    render(<Button variant="contained">Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(
      <Button variant="contained" onClick={handleClick}>
        Click
      </Button>
    );
    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <Button variant="contained" disabled>
        Disabled
      </Button>
    );
    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();
  });
});
