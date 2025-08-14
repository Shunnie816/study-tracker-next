import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Select } from "./index";

describe("Select", () => {
  it("ラベルが表示される", () => {
    render(
      <Select
        label="テストラベル"
        value="A"
        options={["A", "B"]}
        onChange={() => {}}
      />
    );
    expect(document.body.textContent).toContain("テストラベル");
  });

  it("optionsが表示される(string[])", () => {
    render(
      <Select
        label="選択肢"
        value="A"
        options={["A", "B", "C"]}
        onChange={() => {}}
      />
    );
    fireEvent.mouseDown(screen.getByLabelText("選択肢"));
    expect(document.body.textContent).toContain("A");
    expect(document.body.textContent).toContain("B");
    expect(document.body.textContent).toContain("C");
  });

  it("optionsが表示される(object[])", () => {
    const options = [
      { id: "1", name: "りんご" },
      { id: "2", name: "みかん" },
    ];
    render(
      <Select
        label="果物"
        value="1"
        options={options}
        valueKey="id"
        labelKey="name"
        onChange={() => {}}
      />
    );
    fireEvent.mouseDown(screen.getByLabelText("果物"));
    expect(document.body.textContent).toContain("りんご");
    expect(document.body.textContent).toContain("みかん");
  });

  it("onChangeが呼ばれる", () => {
    const handleChange = vi.fn();
    render(
      <Select
        label="選択"
        value="A"
        options={["A", "B"]}
        onChange={handleChange}
      />
    );
    fireEvent.mouseDown(screen.getByLabelText("選択"));
    fireEvent.click(screen.getByText("B"));
    expect(handleChange).toHaveBeenCalledWith("B");
  });

  it("errorとerrorMessageが表示される", () => {
    render(
      <Select
        label="エラー"
        value="A"
        options={["A", "B"]}
        onChange={() => {}}
        error={true}
        errorMessage="エラーメッセージ"
      />
    );
    expect(screen.getByText("エラーメッセージ")).toBeInTheDocument();
  });
});
