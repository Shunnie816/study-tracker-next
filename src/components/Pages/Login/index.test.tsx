import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuth } from "@/libs/hooks/useAuth";

vi.mock("@/libs/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

import { LoginPage } from "./index";

const mockSignInWithGoogle = vi.fn();

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
      signInWithGoogle: mockSignInWithGoogle,
      signOut: vi.fn(),
    });
  });

  it("Googleでログインボタンが表示されるべき", () => {
    render(<LoginPage />);

    expect(screen.getByText("Googleでログイン")).toBeInTheDocument();
  });

  it("ログインボタンをクリックすると signInWithGoogle が呼ばれるべき", async () => {
    mockSignInWithGoogle.mockResolvedValue(undefined);
    render(<LoginPage />);

    fireEvent.click(screen.getByText("Googleでログイン"));

    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalledTimes(1);
    });
  });

  it("ログイン処理中はボタンが disabled になるべき", async () => {
    let resolveLogin: () => void;
    mockSignInWithGoogle.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveLogin = resolve;
      }),
    );
    render(<LoginPage />);

    fireEvent.click(screen.getByText("Googleでログイン"));

    await waitFor(() => {
      expect(screen.getByRole("button")).toBeDisabled();
    });

    resolveLogin!();
  });
});
