import { TextField as MUITextField, TextFieldProps } from "@mui/material";
import React, { forwardRef } from "react";

type Variant = "outlined" | "filled" | "standard";

type BaseProps = {
  variant?: Variant;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void; // 追加
  error?: boolean;
  errorMessage?: string;
};

type Props = BaseProps & TextFieldProps;

export const TextField = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      variant = "outlined",
      value,
      onChange,
      error,
      errorMessage,
    }: Props,
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value); // 親から子へのコールバック
    };

    return (
      <MUITextField
        label={label}
        variant={variant}
        value={value}
        error={error}
        helperText={error && errorMessage}
        fullWidth
        onChange={handleChange}
        ref={ref}
      />
    );
  }
);
TextField.displayName = "TextField";
