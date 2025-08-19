"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { defaultTheme } from "@/assets/themes";
import { Footer } from "@/components/Templates/Footer";
import { Header } from "@/components/Templates/Header";
import styles from "./index.module.scss";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </ThemeProvider>
  );
}
