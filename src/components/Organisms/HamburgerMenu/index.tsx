"use client";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Link from "next/link";
import React from "react";
import { Icon, IconType } from "@/components/Atoms/Icon";
import styles from "./index.module.scss";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuItems: string[];
  icons: IconType[];
  urlPath: string[];
  toggleDrawer: (
    // eslint-disable-next-line no-unused-vars
    open: boolean
    // eslint-disable-next-line no-unused-vars
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

export function HamburgerMenu({
  isOpen,
  setIsOpen,
  menuItems,
  icons,
  urlPath,
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
            <List>
              {menuItems.map((text, index) => (
                <ListItem key={text} disablePadding>
                  <Link href={urlPath[index]} passHref legacyBehavior>
                    <ListItemButton
                      component="a"
                      onClick={() => setIsOpen(false)}
                    >
                      <ListItemIcon>
                        <Icon icon={icons[index]} />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
