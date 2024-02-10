import React, { FC } from "react";
import { IconProps } from "@mui/material/Icon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LoginIcon from "@mui/icons-material/Login";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export type Icon =
  | "edit"
  | "delete"
  | "menu"
  | "login"
  | "book"
  | "school"
  | "time";
type BaseProps = {
  icon: Icon;
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

export const BaseIcon: FC<Props> = ({ icon, color, fontSize }) => {
  const Icon = iconMap[icon] || null;
  return Icon && <Icon color={color} fontSize={fontSize} />;
};
