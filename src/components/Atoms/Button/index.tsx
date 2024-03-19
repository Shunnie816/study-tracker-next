import React, { FC } from "react";
import { Button as MUIButton, ButtonProps } from "@mui/material";

type BaseProps = {
  variant: string;
  color?: string;
  size?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
};

type ButtonType = React.ComponentPropsWithoutRef<"button">;

/** 基本はMUIのButtonのプロパティを使いつつ、一部デフォルトのbuttonのonClickを使う */
type Props = BaseProps & ButtonProps & Omit<ButtonType, keyof BaseProps>;

export const Button: FC<Props> = ({
  variant = "contained",
  color,
  size,
  disabled = false,
  children,
  fullWidth = true,
  ...rest
}) => {
  return (
    <MUIButton
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      {...rest}
    >
      {children}
    </MUIButton>
  );
};
