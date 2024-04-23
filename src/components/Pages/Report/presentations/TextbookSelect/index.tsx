import React, { forwardRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select as MUISelect, SelectChangeEvent } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Textbook } from "@/pages/api/textbook";

type BaseProps = {
  label: string;
  value: string;
  /** MenuItemに格納する値をまとめた配列、validateを使わないときのみ定義 */
  options: Array<Textbook>;
  /**MenuItemに'分'などを付け足したいときに使用 */
  onChange: (event: string) => void;
  error?: boolean;
  errorMessage?: string;
};

type SelectProps = React.ComponentPropsWithoutRef<"select">;
type Props = BaseProps & Omit<SelectProps, keyof BaseProps>;

// eslint-disable-next-line react/display-name
export const TextbookSelect = forwardRef(
  (
    { id, label, value, options, onChange, error, errorMessage }: Props,
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
          {options?.map((item) => (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </MUISelect>
        {error && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    );
  }
);
