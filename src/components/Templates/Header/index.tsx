"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import { Icon } from "@/components/Atoms/Icon";
import { ListMenu } from "@/components/Atoms/ListMenu";
import { HamburgerMenu } from "@/components/Organisms/HamburgerMenu";
import { URL_VALUES } from "@/libs/constants/url";
import { useDeviceSize } from "@/libs/hooks/useDeviceSize";
import { clns } from "@/libs/utils/clns/indext";
import styles from "./index.module.scss";
import { useHamburgerMenu } from "./useHamburgerMenu";

export function Header() {
  const { isPC } = useDeviceSize();
  const { isOpen, setIsOpen, toggleDrawer, menuItems } = useHamburgerMenu();

  return (
    <Box sx={{ flexGrow: 1, width: "100%", position: "fixed", zIndex: "100" }}>
      <AppBar position="static">
        <Toolbar className={styles.headerMenu}>
          <Link href={URL_VALUES.REPORT} className={styles.link}>
            <Typography color="inherit" variant="h6">
              Study Tracker
            </Typography>
          </Link>
          <div className={clns(styles.pcHeader, isPC && styles.isPC)}>
            <ListMenu items={menuItems} row />
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
              toggleDrawer={toggleDrawer}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
