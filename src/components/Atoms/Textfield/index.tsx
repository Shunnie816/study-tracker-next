import React, { FC } from "react";
import Box from "@mui/material/Box";
import { TextField, TextFieldProps } from "@mui/material";

type Variant = "outlined" | "filled" | "standard";

type BaseProps = {
  id?: string;
  label: string;
  variant: Variant;
  onInput: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  error?: boolean;
  helperText?: string;
};

type Props = BaseProps & Pick<TextFieldProps, keyof BaseProps>;

/**
 * textfiledだけの役割を持たせるため、formは画面で実装
 */
export const Textfield: FC<Props> = ({ ...Props }) => {
  return <TextField {...Props} fullWidth />;
};
