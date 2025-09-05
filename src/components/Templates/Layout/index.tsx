"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "jotai";
import React from "react";
import { defaultTheme } from "@/assets/themes";
import { Footer } from "@/components/Templates/Footer";
import { Header } from "@/components/Templates/Header";
import styles from "./index.module.scss";

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
        <Header />
        <div className={styles.container}>{children}</div>
        <Footer />
      </Provider>
    </ThemeProvider>
  );
}
