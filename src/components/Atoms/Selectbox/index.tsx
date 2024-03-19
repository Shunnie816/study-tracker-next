import React, { forwardRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type BaseProps = {
  label: string;
  value: string;
  /** MenuItemに格納する値をまとめた配列、validateを使わないときのみ定義 */
  options: Array<string | number>;
  /**MenuItemに'分'などを付け足したいときに使用 */
  menuItemText?: string;
  // onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  onChange: (event: string) => void;
};

type SelectProps = React.ComponentPropsWithoutRef<"select">;
type Props = BaseProps & Omit<SelectProps, keyof BaseProps>;

// eslint-disable-next-line react/display-name
export const Selectbox = forwardRef(
  ({ id, label, value, options, menuItemText, onChange }: Props, ref) => {
    const handleChange = (event: SelectChangeEvent) => {
      onChange(event.target.value);
    };

    return (
      <FormControl fullWidth>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
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
        </Select>
      </FormControl>
    );
  }
);
