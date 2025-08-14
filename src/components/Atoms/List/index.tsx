import { List as MUIList } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Icon } from "../Icon";
import styles from "./index.module.scss";

type Props = {
  items: Array<string>;
  icon?: boolean;
  onClick: () => void;
};

export function List({ items, icon, onClick }: Props) {
  return (
    <MUIList className={styles.container}>
      {items.map((value, index) => (
        <ListItem disablePadding key={index}>
          <ListItemText>{value}</ListItemText>
          {icon && (
            <>
              <ListItemSecondaryAction onClick={onClick}>
                <IconButton>
                  <Icon icon="edit" />
                </IconButton>
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>
      ))}
    </MUIList>
  );
}
