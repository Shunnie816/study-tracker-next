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
 * Box(form)コンポーネントでネストした状態にするかは要検討
 * react-hook-form実装時に不便になるかもしれないため
 * Textfieldのpropsだけ入れ替えられるならBoxも含めた実装にする
 */
export const Textfield: FC<Props> = ({ ...Props }) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { margin: "0.5rem 0.7rem", width: "80%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField {...Props} />
    </Box>
  );
};
