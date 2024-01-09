"use client";

import React, { FC } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import styles from "./index.module.scss";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { BaseIcon, Icon } from "@/components/Atoms/BaseIcon";
import { useRouter } from "next/navigation";

type Props = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HamburgerMenu: FC<Props> = ({ state, setState }) => {
  const router = useRouter();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState(open);
    };

  const menuItems = ["ログイン", "記録する", "教材登録", "学習記録"];
  const icons: Icon[] = ["login", "edit", "book", "school"];
  const urlPath = ["/", "/", "/register", "/posts"];

  return (
    <div>
      <>
        <SwipeableDrawer
          anchor={"right"}
          open={state}
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
                    <ListItemButton onClick={() => router.push(urlPath[index])}>
                      <ListItemIcon>
                        <BaseIcon icon={icons[index]} />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
            {/* <div>
              <Button color="inherit">ログイン</Button>
              <Button color="inherit" onClick={() => router.push("/")}>
                記録する
              </Button>
              <Button color="inherit" onClick={() => router.push("/register")}>
                教材登録
              </Button>
              <Button color="inherit" onClick={() => router.push("/posts")}>
                学習記録
              </Button>
            </div> */}
          </div>
        </SwipeableDrawer>
      </>
    </div>
  );
};
