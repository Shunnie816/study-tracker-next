import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoginIcon from "@mui/icons-material/Login";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SchoolIcon from "@mui/icons-material/School";
import { IconProps } from "@mui/material/Icon";
import React from "react";

export type IconType =
  | "edit"
  | "delete"
  | "menu"
  | "login"
  | "book"
  | "school"
  | "time";
type BaseProps = {
  icon: IconType;
};
type Props = BaseProps & Pick<IconProps, "color" | "fontSize">;

const iconMap = {
  edit: EditIcon,
  delete: DeleteIcon,
  menu: MenuOutlinedIcon,
  login: LoginIcon,
  book: MenuBookIcon,
  school: SchoolIcon,
  time: AccessTimeIcon,
};

export function Icon({ icon, color, fontSize }: Props) {
  const Icon = iconMap[icon] || null;
  return Icon && <Icon color={color} fontSize={fontSize} />;
}
