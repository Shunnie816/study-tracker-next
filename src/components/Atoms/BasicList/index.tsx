import React, { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@/components/Atoms/Icon";
import styles from "./index.module.scss";

type Props = {
  items: Array<string>;
  icon: boolean;
  onClick: () => void;
};

export const BasicList: FC<Props> = ({ items, icon, onClick }) => {
  return (
    <List className={styles.container}>
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
    </List>
  );
};
