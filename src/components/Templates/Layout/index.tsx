"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "jotai";
import React from "react";
import { defaultTheme } from "@/assets/themes";
import { AuthGuard } from "./AuthGuard";

type Props = {
  children: React.ReactNode;
};

/**
 * クライアント側のコンポーネントとして描画するため、グローバルな状態管理やテーマをここに記述する
 * ※layout.tsxをuse clientにするのは非推奨
 */
export function Layout({ children }: Props) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Provider>
        <AuthGuard>{children}</AuthGuard>
      </Provider>
    </ThemeProvider>
  );
}
