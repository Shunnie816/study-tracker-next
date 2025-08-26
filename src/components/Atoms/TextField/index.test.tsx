import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { TextField } from "./index";

describe("TextField", () => {
  it("ラベルが表示される", () => {
    render(<TextField label="名前" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("名前")).toBeInTheDocument();
  });

  it("値が入力できる", () => {
    render(<TextField label="名前" onChange={() => {}} />);
    const input = screen.getByLabelText("名前");
    fireEvent.change(input, { target: { value: "テスト" } });
    expect((input as HTMLInputElement).value).toBe("テスト");
  });

  it("onChangeが呼ばれる", () => {
    const handleChange = vi.fn();
    render(<TextField label="名前" onChange={handleChange} />);
    const input = screen.getByLabelText("名前");
    fireEvent.change(input, { target: { value: "テスト" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("errorとerrorMessageが表示される", () => {
    render(
      <TextField
        label="名前"
        onChange={() => {}}
        error={true}
        errorMessage="エラーです"
      />
    );
    expect(screen.getByText("エラーです")).toBeInTheDocument();
  });
});
