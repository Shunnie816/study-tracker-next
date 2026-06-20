import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { User } from "firebase/auth";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { HamburgerMenu } from "./index";

const menuItems = [{ label: "記録する", icon: "edit" as const, href: "/" }];

const defaultProps = {
  isOpen: true,
  setIsOpen: vi.fn(),
  menuItems,
  toggleDrawer: () => () => {},
  signOut: vi.fn(),
};

function makeUser(overrides: Partial<User> = {}): User {
  return {
    uid: "user-1",
    displayName: "Test User",
    email: "test@example.com",
    photoURL: null,
    ...overrides,
  } as User;
}

describe("HamburgerMenu", () => {
  it("user が null のときユーザー情報とログアウトボタンを表示しないべき", () => {
    render(<HamburgerMenu {...defaultProps} user={null} />);

    expect(screen.queryByText("ログアウト")).not.toBeInTheDocument();
    expect(screen.queryByText("test@example.com")).not.toBeInTheDocument();
  });

  it("user が存在するとき表示名を表示すべき", () => {
    render(<HamburgerMenu {...defaultProps} user={makeUser()} />);

    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("user が存在するときメールアドレスを表示すべき", () => {
    render(<HamburgerMenu {...defaultProps} user={makeUser()} />);

    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("displayName が null のときメールアドレスを表示名として表示すべき", () => {
    render(
      <HamburgerMenu {...defaultProps} user={makeUser({ displayName: null })} />
    );

    expect(screen.getAllByText("test@example.com")).toHaveLength(1);
  });

  it("ログアウトボタンをクリックすると signOut が呼ばれるべき", async () => {
    const signOut = vi.fn().mockResolvedValue(undefined);
    render(
      <HamburgerMenu {...defaultProps} user={makeUser()} signOut={signOut} />
    );

    fireEvent.click(screen.getByText("ログアウト"));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledTimes(1);
    });
  });
});
