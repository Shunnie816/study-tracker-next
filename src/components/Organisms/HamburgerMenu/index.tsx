"use client";
import { Box } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import React from "react";
import { ListMenu } from "@/components/Atoms/ListMenu";
import { UseHamburgerMenu } from "@/components/Templates/Header/useHamburgerMenu";
import styles from "./index.module.scss";

type Props = UseHamburgerMenu;

export function HamburgerMenu({
  isOpen,
  setIsOpen,
  menuItems,
  toggleDrawer,
}: Props) {
  return (
    <div>
      <SwipeableDrawer
        anchor={"right"}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div className={styles.container}>
          <Box
            sx={{ width: 250 }}
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
        </div>
      </SwipeableDrawer>
    </div>
  );
}
