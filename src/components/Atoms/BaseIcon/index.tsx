import React, { FC } from "react";
import { IconProps } from "@mui/material/Icon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LoginIcon from "@mui/icons-material/Login";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";

export type Icon = "edit" | "delete" | "menu" | "login" | "book" | "school";
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
};

export const BaseIcon: FC<Props> = ({ icon, color, fontSize }) => {
  const Icon = iconMap[icon] || null;
  return Icon && <Icon color={color} fontSize={fontSize} />;
};
