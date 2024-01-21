import React, { FC } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

type BaseProps = {
  id?: string;
  value: string;
  label: string;
  /** MenuItemに格納する値をまとめた配列*/
  items: Array<string>;
  /**MenuItemに'分'などを付け足したいときに使用 */
  menuItemText?: string;
  error?: boolean;
  errorMessage: string;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
};

type SelectProps = React.ComponentPropsWithoutRef<"select">;
type Props = BaseProps & Omit<SelectProps, keyof BaseProps>;

export const Selectbox: FC<Props> = ({
  id,
  value,
  label,
  items,
  menuItemText,
  error,
  errorMessage,
  onChange,
}) => {
  return (
    <Box sx={{ width: "80%", margin: "1.0rem 0.7rem" }}>
      <FormControl fullWidth error={error}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          id={id}
          value={value}
          label={label}
          onChange={onChange}
        >
          {items.map((item, index) => (
            <MenuItem value={item} key={index}>
              {menuItemText ? item + menuItemText : item}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
