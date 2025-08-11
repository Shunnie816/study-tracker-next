"use client";
import React, { FC } from "react";
import { Header } from "../Header";
import styles from "./index.module.scss";
import { Footer } from "../Footer";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { defaultTheme } from "@/assets/themes";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </ThemeProvider>
  );
};
