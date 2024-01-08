"use client";

import React, { FC } from "react";
import router from "next/router";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import styles from "./index.module.scss";

type Props = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HamburgerMenu: FC<Props> = ({ state, setState }) => {
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
            <div>
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
            </div>
          </div>
        </SwipeableDrawer>
      </>
    </div>
  );
};
