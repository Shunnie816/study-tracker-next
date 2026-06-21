"use client";
import { Avatar, Box, Typography } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { User } from "firebase/auth";
import React from "react";
import { ListMenu } from "@/components/Atoms/ListMenu";
import { UseHamburgerMenu } from "@/components/Templates/Header/useHamburgerMenu";
import styles from "./index.module.scss";

type Props = UseHamburgerMenu & {
  user: User | null;
  signOut: () => Promise<void>;
};

export function HamburgerMenu({
  isOpen,
  setIsOpen,
  menuItems,
  toggleDrawer,
  user,
  signOut,
}: Props) {
  return (
    <div>
      <SwipeableDrawer
        anchor={"right"}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          className={styles.container}
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {/* ナビゲーション */}
          <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <ListMenu
              items={menuItems}
              showIcons
              onClick={() => setIsOpen(false)}
            />
          </Box>

          {/* DrawerFooter */}
          {user && (
            <Box
              sx={{
                mt: "auto",
                borderTop: "1px solid #E2E4F0",
                px: 2,
                py: 2.5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* ユーザー情報 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  src={user.photoURL ?? undefined}
                  alt={user.displayName ?? "user"}
                  sx={{
                    width: 28,
                    height: 28,
                    fontSize: 12,
                    background:
                      "linear-gradient(135deg, #3A0CA3 0%, #4361EE 100%)",
                  }}
                />
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1A1D3B",
                      lineHeight: 1.3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.displayName ?? user.email}
                  </Typography>
                  {user.displayName && (
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "#9194AF",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user.email}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* ログアウトボタン */}
              <button
                onClick={async () => {
                  setIsOpen(false);
                  await signOut();
                }}
                style={{
                  width: "100%",
                  background: "white",
                  border: "1.5px solid #FFD0D0",
                  borderRadius: 8,
                  padding: "10px 16px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#E53935",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                ログアウト
              </button>
            </Box>
          )}
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
