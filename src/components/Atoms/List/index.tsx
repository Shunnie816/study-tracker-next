import React, { FC } from "react";
import { List as MUIList } from "@mui/material";
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

export const List: FC<Props> = ({ items, icon, onClick }) => {
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
};
