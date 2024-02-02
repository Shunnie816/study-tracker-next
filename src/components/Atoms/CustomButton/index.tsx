import React, { FC } from "react";
import Button, { ButtonProps } from "@mui/material/Button";

type BaseProps = {
  variant: string;
  color?: string;
  size?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

type ButtonType = React.ComponentPropsWithoutRef<"button">;

/** 基本はMUIのButtonのプロパティを使いつつ、一部デフォルトのbuttonのonClickを使う */
type Props = BaseProps & ButtonProps & Omit<ButtonType, keyof BaseProps>;

export const CustomButton: FC<Props> = ({
  variant = "contained",
  color,
  size,
  disabled = false,
  children,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Button>
  );
};
