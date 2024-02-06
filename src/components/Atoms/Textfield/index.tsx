import React, { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";

type Variant = "outlined" | "filled" | "standard";

type BaseProps = {
  label: string;
  variant: Variant;
  error?: boolean;
  errorMessage?: string;
};

type Props = BaseProps & TextFieldProps;

export const Textfield = forwardRef<HTMLInputElement, Props>(
  ({ label, variant, error, errorMessage }: Props, ref) => {
    return (
      <TextField
        label={label}
        variant={variant}
        error={error}
        helperText={error && errorMessage}
        fullWidth
        ref={ref}
      />
    );
  }
);
Textfield.displayName = "Textfield";
