import React, { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";

type Variant = "outlined" | "filled" | "standard";

type BaseProps = {
  label: string;
  variant?: Variant;
  value: string;
  onChange: (value: string) => void; // 追加
  error?: boolean;
  errorMessage?: string;
};

type Props = BaseProps & TextFieldProps;

export const Textfield = forwardRef<HTMLInputElement, Props>(
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
      <TextField
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
Textfield.displayName = "Textfield";
