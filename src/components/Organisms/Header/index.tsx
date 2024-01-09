"use client";

import React, { FC, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BaseIcon } from "@/components/Atoms/BaseIcon";
import { HamburgerMenu } from "@/components/Molecules/HamburgerMenu";
import styles from "./index.module.scss";

type Props = {};

export const Header: FC<Props> = () => {
  const [state, setState] = useState<boolean>(false);

  return (
    <Box sx={{ flexGrow: 1, width: "100%", position: "fixed" }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            color="inherit"
            variant="h6"
            component="a"
            href="/"
            sx={{
              textDecoration: "none",
            }}
          >
            Study Tracker
          </Typography>
          <div className={styles.menuIcon}>
            <a onClick={() => setState(true)}>
              <BaseIcon icon={"menu"} color="inherit" />
            </a>
            <HamburgerMenu state={state} setState={setState} />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
