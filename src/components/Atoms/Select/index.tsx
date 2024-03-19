import React, { forwardRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select as MUISelect, SelectChangeEvent } from "@mui/material";
import { FormHelperText } from "@mui/material";

type BaseProps = {
  label: string;
  value: string;
  /** MenuItemに格納する値をまとめた配列、validateを使わないときのみ定義 */
  options: Array<string | number>;
  /**MenuItemに'分'などを付け足したいときに使用 */
  menuItemText?: string;
  onChange: (event: string) => void;
  error?: boolean;
  errorMessage?: string;
};

type SelectProps = React.ComponentPropsWithoutRef<"select">;
type Props = BaseProps & Omit<SelectProps, keyof BaseProps>;

// eslint-disable-next-line react/display-name
export const Select = forwardRef(
  (
    {
      id,
      label,
      value,
      options,
      menuItemText,
      onChange,
      error,
      errorMessage,
    }: Props,
    ref
  ) => {
    const handleChange = (event: SelectChangeEvent) => {
      onChange(event.target.value); // 親から子へのコールバック
    };

    return (
      <FormControl fullWidth error={error}>
        <InputLabel id={label}>{label}</InputLabel>
        <MUISelect
          labelId={label}
          id={id}
          label={label}
          value={value}
          onChange={handleChange}
          ref={ref}
        >
          {options?.map((item, index) => (
            <MenuItem value={item} key={index}>
              {menuItemText ? item + menuItemText : item}
            </MenuItem>
          ))}
        </MUISelect>
        {error && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    );
  }
);
