import React, { FC } from "react";
import Button, { ButtonProps } from "@mui/material/Button";

type BaseProps = {
  variant: string;
  color?: string;
  size?: string;
  disabled?: boolean;
  children: string;
};

type ButtonType = React.ComponentPropsWithoutRef<"button">;

/** 基本はMUIのButtonのプロパティを使いつつ、一部デフォルトのbuttonのonClickを使う */
type Props = BaseProps &
  Pick<ButtonProps, keyof BaseProps> &
  Pick<ButtonType, "onClick">;

export const CustomButton: FC<Props> = ({
  variant = "contained",
  color,
  size,
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
