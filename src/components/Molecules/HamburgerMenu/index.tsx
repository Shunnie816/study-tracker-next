import React, { FC, useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { BaseIcon } from "@/components/Atoms/BaseIcon";

import styles from "./index.module.scss";

//rightだけ出るようにすっきりさせたが、本来は不要なコードも混ざっていそう

type Anchor = "right";
type Props = { children: React.ReactNode };

export const HamburgerMenu: FC<Props> = ({ children }) => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer("right", true)}>
          <BaseIcon icon={"menu"} color="action" />
        </Button>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          <div className={styles.container}>{children}</div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
