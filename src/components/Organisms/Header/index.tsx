"use client";
import React, { FC, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BaseIcon } from "@/components/Atoms/BaseIcon";
import { HamburgerMenu } from "@/components/Molecules/HamburgerMenu";
import styles from "./index.module.scss";
import { CustomButton } from "@/components/Atoms/CustomButton";
import Link from "next/link";

type Props = {};

export const Header: FC<Props> = () => {
  const [state, setState] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);

    // コンポーネントがアンマウントされた時にイベントリスナーを削除
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1, width: "100%", position: "fixed", zIndex: "100" }}>
      <AppBar position="static">
        <Toolbar className={styles.headerMenu}>
          <Typography color="inherit" variant="h6" component="a" href="/">
            Study Tracker
          </Typography>
          {isMobile ? (
            <div className={styles.mobileHeader}>
              <a onClick={() => setState(true)}>
                <BaseIcon icon={"menu"} color="inherit" />
              </a>
              <HamburgerMenu state={state} setState={setState} />
            </div>
          ) : (
            <div className={styles.pcHeader}>
              <CustomButton color="inherit" variant="text">
                <Link href="/" className={styles.link}>
                  ログイン
                </Link>
              </CustomButton>
              <CustomButton color="inherit" variant="text">
                <Link href="/" className={styles.link}>
                  記録する
                </Link>
              </CustomButton>
              <CustomButton color="inherit" variant="text">
                <Link href="/register" className={styles.link}>
                  教材登録
                </Link>
              </CustomButton>
              <CustomButton color="inherit" variant="text">
                <Link href="/posts" className={styles.link}>
                  学習記録
                </Link>
              </CustomButton>
              <CustomButton color="inherit" variant="text">
                <Link href="/study-log" className={styles.link}>
                  学習時間
                </Link>
              </CustomButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
