import { renderHook, act } from "@testing-library/react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/libs/firebase", () => ({ auth: {} }));

vi.mock("firebase/auth", () => ({
  GoogleAuthProvider: vi.fn(),
  onAuthStateChanged: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
}));

import { useAuth } from "./useAuth";

const mockUser = {
  uid: "user-1",
  displayName: "Test User",
  email: "test@example.com",
  photoURL: null,
};

describe("useAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("初期状態は loading=true, user=null であるべき", () => {
    vi.mocked(onAuthStateChanged).mockReturnValue(() => {});

    const { result } = renderHook(() => useAuth());

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
  });

  it("認証ユーザーが存在するとき user を更新し loading=false にすべき", () => {
    vi.mocked(onAuthStateChanged).mockImplementation((_, next) => {
      if (typeof next === "function") next(mockUser as any);
      return () => {};
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it("認証ユーザーが null のとき user=null, loading=false にすべき", () => {
    vi.mocked(onAuthStateChanged).mockImplementation((_, next) => {
      if (typeof next === "function") next(null);
      return () => {};
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("アンマウント時に onAuthStateChanged のサブスクリプションを解除すべき", () => {
    const unsubscribe = vi.fn();
    vi.mocked(onAuthStateChanged).mockReturnValue(unsubscribe);

    const { unmount } = renderHook(() => useAuth());
    unmount();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  it("signInWithGoogle を呼ぶと GoogleAuthProvider を使って signInWithPopup が実行されるべき", async () => {
    vi.mocked(onAuthStateChanged).mockReturnValue(() => {});
    vi.mocked(signInWithPopup).mockResolvedValue({} as any);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signInWithGoogle();
    });

    expect(GoogleAuthProvider).toHaveBeenCalledTimes(1);
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });

  it("signOut を呼ぶと firebase の signOut が実行されるべき", async () => {
    vi.mocked(onAuthStateChanged).mockReturnValue(() => {});
    vi.mocked(firebaseSignOut).mockResolvedValue(undefined);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signOut();
    });

    expect(firebaseSignOut).toHaveBeenCalledTimes(1);
  });
});
