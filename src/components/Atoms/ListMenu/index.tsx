import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { Icon, IconType } from "../Icon";

export type ListMenuItem = {
  label: string;
  icon?: IconType;
  href: string;
};

type ListMenuProps = {
  items: ListMenuItem[];
  showIcons?: boolean;
  onClick?: () => void;
  row?: boolean;
};

export function ListMenu({
  items,
  showIcons = false,
  onClick,
  row = false,
}: ListMenuProps) {
  return (
    <List sx={{ display: row ? "flex" : "block", gap: row ? 4 : 0 }}>
      {items.map((item) => (
        <ListItem key={item.label} disablePadding>
          <Link href={item.href} passHref legacyBehavior>
            <ListItemButton component="a" onClick={onClick}>
              {showIcons && item.icon && (
                <ListItemIcon>
                  <Icon icon={item.icon} />
                </ListItemIcon>
              )}
              <ListItemText primary={item.label} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
