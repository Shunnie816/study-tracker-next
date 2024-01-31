import React, { forwardRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

type BaseProps = {
  label: string;
  value: string;
  /** MenuItemに格納する値をまとめた配列、validateを使わないときのみ定義 */
  options?: Array<string>;
  /**MenuItemに'分'などを付け足したいときに使用 */
  menuItemText?: string;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  validate?: {
    error: boolean;
    errorMessage: string;
  };
  children?: React.ReactNode;
};

type SelectProps = React.ComponentPropsWithoutRef<"select">;
type Props = BaseProps & Omit<SelectProps, keyof BaseProps>;

// eslint-disable-next-line react/display-name
export const Selectbox = forwardRef(
  (
    {
      id,
      label,
      value,
      options,
      menuItemText,
      onChange,
      validate,
      children,
    }: Props,
    ref
  ) => {
    return (
      <FormControl fullWidth error={validate?.error}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          id={id}
          label={label}
          value={value}
          onChange={onChange}
          ref={ref}
        >
          {children
            ? children
            : options?.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {menuItemText ? item + menuItemText : item}
                </MenuItem>
              ))}
        </Select>
        {validate?.error && (
          <FormHelperText>{validate?.errorMessage}</FormHelperText>
        )}
      </FormControl>
    );
  }
);
