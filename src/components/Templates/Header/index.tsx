"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/Atoms/Button";
import { Icon } from "@/components/Atoms/Icon";
import { HamburgerMenu } from "@/components/Organisms/HamburgerMenu";
import { useDeviceSize } from "@/libs/hooks/useDeviceSize";
import { clns } from "@/libs/utils/clns/indext";
import styles from "./index.module.scss";
import { useHamburgerMenu } from "./useHamburgerMenu";

export function Header() {
  const { isPC } = useDeviceSize();
  const { isOpen, setIsOpen, toggleDrawer, menuItems, icons, urlPath } =
    useHamburgerMenu();

  return (
    <Box sx={{ flexGrow: 1, width: "100%", position: "fixed", zIndex: "100" }}>
      <AppBar position="static">
        <Toolbar className={styles.headerMenu}>
          <Typography color="inherit" variant="h6" component="a" href="/">
            Study Tracker
          </Typography>
          <div className={clns(styles.pcHeader, isPC && styles.isPC)}>
            <Button color="inherit" variant="text">
              <Link href="/" className={styles.link}>
                ログイン
              </Link>
            </Button>
            <Button color="inherit" variant="text">
              <Link href="/" className={styles.link}>
                記録する
              </Link>
            </Button>
            <Button color="inherit" variant="text">
              <Link href="/register" className={styles.link}>
                教材登録
              </Link>
            </Button>
            <Button color="inherit" variant="text">
              <Link href="/posts" className={styles.link}>
                学習記録
              </Link>
            </Button>
            <Button color="inherit" variant="text">
              <Link href="/study-log" className={styles.link}>
                学習時間
              </Link>
            </Button>
          </div>
          {/* ハンバーガーメニュー */}
          <div className={clns(styles.mobileHeader, isPC && styles.isPC)}>
            <a onClick={() => setIsOpen(true)}>
              <Icon icon={"menu"} color="inherit" />
            </a>
            <HamburgerMenu
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              menuItems={menuItems}
              icons={icons}
              urlPath={urlPath}
              toggleDrawer={toggleDrawer}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
