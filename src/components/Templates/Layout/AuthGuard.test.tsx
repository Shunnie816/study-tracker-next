import { render, screen, waitFor } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuth } from "@/libs/hooks/useAuth";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock("@/libs/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("@/components/Templates/Header", () => ({
  Header: () => <div data-testid="header" />,
}));

vi.mock("@/components/Templates/Footer", () => ({
  Footer: () => <div data-testid="footer" />,
}));

import { AuthGuard } from "./AuthGuard";

const mockReplace = vi.fn();

const authenticatedUser = {
  uid: "user-1",
  displayName: "Test User",
  email: "test@example.com",
};

function makeAuthState(overrides: Partial<ReturnType<typeof useAuth>>) {
  return {
    user: null,
    loading: false,
    signInWithGoogle: vi.fn(),
    signOut: vi.fn(),
    ...overrides,
  };
}

describe("AuthGuard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({ replace: mockReplace } as any);
  });

  it("ローディング中は CircularProgress を表示すべき", () => {
    vi.mocked(useAuth).mockReturnValue(makeAuthState({ loading: true }));
    vi.mocked(usePathname).mockReturnValue("/");

    render(<AuthGuard><div>content</div></AuthGuard>);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByText("content")).not.toBeInTheDocument();
  });

  it("未認証でログインページ以外にアクセスしたとき /login にリダイレクトすべき", async () => {
    vi.mocked(useAuth).mockReturnValue(makeAuthState({ user: null }));
    vi.mocked(usePathname).mockReturnValue("/");

    render(<AuthGuard><div>content</div></AuthGuard>);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/login");
    });
  });

  it("認証済みで /login にアクセスしたとき / にリダイレクトすべき", async () => {
    vi.mocked(useAuth).mockReturnValue(
      makeAuthState({ user: authenticatedUser as any }),
    );
    vi.mocked(usePathname).mockReturnValue("/login");

    render(<AuthGuard><div>content</div></AuthGuard>);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });

  it("未認証で /login にアクセスしたとき Header・Footer なしで子コンポーネントを表示すべき", () => {
    vi.mocked(useAuth).mockReturnValue(makeAuthState({ user: null }));
    vi.mocked(usePathname).mockReturnValue("/login");

    render(<AuthGuard><div>login content</div></AuthGuard>);

    expect(screen.getByText("login content")).toBeInTheDocument();
    expect(screen.queryByTestId("header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer")).not.toBeInTheDocument();
  });

  it("認証済みでログインページ以外にアクセスしたとき Header・子・Footer を表示すべき", () => {
    vi.mocked(useAuth).mockReturnValue(
      makeAuthState({ user: authenticatedUser as any }),
    );
    vi.mocked(usePathname).mockReturnValue("/");

    render(<AuthGuard><div>main content</div></AuthGuard>);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByText("main content")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
