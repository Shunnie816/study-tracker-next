"use client";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import { Icon } from "@/components/Atoms/Icon";
import { ListMenu } from "@/components/Atoms/ListMenu";
import { HamburgerMenu } from "@/components/Organisms/HamburgerMenu";
import { URL_VALUES } from "@/libs/constants/url";
import { useAuth } from "@/libs/hooks/useAuth";
import { useDeviceSize } from "@/libs/hooks/useDeviceSize";
import { clns } from "@/libs/utils/clns/indext";
import styles from "./index.module.scss";
import { useHamburgerMenu } from "./useHamburgerMenu";

export function Header() {
  const { isPC } = useDeviceSize();
  const { isOpen, setIsOpen, toggleDrawer, menuItems } = useHamburgerMenu();
  const { user, signOut } = useAuth();

  return (
    <Box sx={{ flexGrow: 1, width: "100%", position: "fixed", zIndex: "100" }}>
      <AppBar
        position="static"
        sx={{ background: "linear-gradient(135deg, #3A0CA3 0%, #4361EE 100%)" }}
      >
        <Toolbar className={styles.headerMenu}>
          <Link href={URL_VALUES.REPORT} className={styles.link}>
            <Typography color="inherit" variant="h6">
              Study Tracker
            </Typography>
          </Link>
          <div className={clns(styles.pcHeader, isPC && styles.isPC)}>
            <ListMenu items={menuItems} row />
          </div>
          {/* ハンバーガーメニュー（モバイルのみ） */}
          <div className={clns(styles.mobileHeader, isPC && styles.isPC)}>
            <a onClick={() => setIsOpen(true)}>
              <Icon icon={"menu"} color="inherit" />
            </a>
            <HamburgerMenu
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              menuItems={menuItems}
              toggleDrawer={toggleDrawer}
              user={user}
              signOut={signOut}
            />
          </div>
          {/* アバター + ログアウト（PC のみ） */}
          {user && isPC && (
            <Tooltip title={`${user.displayName ?? user.email} — ログアウト`}>
              <IconButton onClick={signOut} sx={{ ml: 1 }}>
                <Avatar
                  src={user.photoURL ?? undefined}
                  alt={user.displayName ?? "user"}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
