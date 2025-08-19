import { TextField as MUITextField, TextFieldProps } from "@mui/material";
import React from "react";

type Variant = "outlined" | "filled" | "standard";

type BaseProps = {
  variant?: Variant;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
};

type Props = BaseProps & TextFieldProps;

function TextFieldInner(
  {
    label,
    variant = "outlined",
    value,
    onChange,
    error,
    errorMessage,
    ...rest
  }: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
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
      {...rest}
    />
  );
}

export const TextField = React.forwardRef(TextFieldInner);
