import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { PostData } from "@/libs/types";
import { Post } from "./index";

const makePostData = (color?: string): PostData => ({
  id: "post-1",
  date: "2025/09/23 10:00",
  textbook: { id: "t1", name: "TypeScript", color },
  time: "1時間30分",
  content: "型ガードとユニオン型を学習した",
});

describe("Post", () => {
  it("教材名が表示されるべき", () => {
    render(<Post data={makePostData("#06B6D4")} handleOpen={vi.fn()} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("学習内容が表示されるべき", () => {
    render(<Post data={makePostData("#06B6D4")} handleOpen={vi.fn()} />);
    expect(screen.getByText("型ガードとユニオン型を学習した")).toBeInTheDocument();
  });

  it("削除ボタンをクリックすると handleOpen が投稿 ID で呼ばれるべき", () => {
    const handleOpen = vi.fn();
    render(<Post data={makePostData()} handleOpen={handleOpen} />);
    fireEvent.click(screen.getByRole("button", { name: /削除/ }));
    expect(handleOpen).toHaveBeenCalledWith("post-1");
  });

  it("textbook.color が設定されているときカラードットが表示されるべき", () => {
    const { container: withColor } = render(
      <Post data={makePostData("#06B6D4")} handleOpen={vi.fn()} />
    );
    const { container: withoutColor } = render(
      <Post data={makePostData()} handleOpen={vi.fn()} />
    );
    // TextbookColorDot は span として描画されるため、color あり時の方が span 数が多い
    const spanCountWithColor = withColor.querySelectorAll("span").length;
    const spanCountWithoutColor = withoutColor.querySelectorAll("span").length;
    expect(spanCountWithColor).toBeGreaterThan(spanCountWithoutColor);
  });

  it("textbook.color が未設定のときカラードットなしで正常にレンダリングされるべき", () => {
    render(<Post data={makePostData()} handleOpen={vi.fn()} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
