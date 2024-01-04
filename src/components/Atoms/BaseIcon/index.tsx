import React, { FC } from "react";
import { IconProps } from "@mui/material/Icon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";

type Icon = "edit" | "delete" | "menu";
type BaseProps = {
  icon: Icon;
};
type Props = BaseProps & Pick<IconProps, "color" | "fontSize">;

const iconMap = {
  edit: EditIcon,
  delete: DeleteIcon,
  menu: MenuIcon,
};

export const BaseIcon: FC<Props> = ({ icon, color, fontSize }) => {
  const Icon = iconMap[icon] || null;
  return Icon && <Icon color={color} fontSize={fontSize} />;
};
