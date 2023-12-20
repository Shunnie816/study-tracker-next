import React, { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit"; //Iconコンポーネントを作ったら削除

import styles from "./index.module.scss";

type Props = {
  items: Array<string>;
  icon: boolean;
};

export const BasicList: FC<Props> = ({ items, icon }) => {
  return (
    <List className={styles.container}>
      {items.map((value, index) => (
        <ListItem disablePadding key={index}>
          <ListItemText>{value}</ListItemText>
          {icon && (
            <ListItemSecondaryAction>
              <IconButton>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))}
    </List>
  );
};
