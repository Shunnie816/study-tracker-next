import React, { FC } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

type BaseProps = {
  labelId?: string;
  id?: string;
  value: "";
  label: string;
  onChange: SelectChangeEvent;
  /** MenuItemに格納する値をまとめた配列*/
  items: Array<string | number>;
  /**MenuItemに'分'などを付け足したいときに使用 */
  menuItemText?: string;
  error: boolean;
  errorMessage: string;
};

/** items, error, menuItemText以外はSelectPropsと共通のkeyを持つ */
type Props = BaseProps &
  Pick<
    SelectProps,
    keyof Omit<BaseProps, "items" | "menuItemText" | "error" | "errorMessage">
  >;

export const Selectbox: FC<Props> = ({
  labelId,
  id,
  value,
  label,
  onChange,
  items,
  menuItemText,
  error,
  errorMessage,
}) => {
  return (
    <Box sx={{ width: "80%", margin: "1.0rem 0.7rem" }}>
      <FormControl fullWidth error={error}>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={labelId}
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
