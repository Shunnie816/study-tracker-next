import { Select as MUISelect, SelectChangeEvent } from "@mui/material";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import React, { forwardRef } from "react";

type BaseProps<T> = {
  label: string;
  value: string;
  /** MenuItemに格納する値をまとめた配列、validateを使わないときのみ定義 */
  options: T[];
  valueKey?: keyof T;
  labelKey?: keyof T;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: string) => void;
  error?: boolean;
  errorMessage?: string;
};

type SelectProps = React.ComponentPropsWithoutRef<"select">;
type Props<T> = BaseProps<T> & Omit<SelectProps, keyof BaseProps<T>>;

/** Note: SelectInnerは実装の中身 */
function SelectInner<T>(
  {
    id,
    label,
    value,
    options,
    valueKey,
    labelKey,
    onChange,
    error,
    errorMessage,
  }: Props<T>,
  ref: React.Ref<HTMLSelectElement>
) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  // optionsの先頭に空白（未選択）を追加
  const formattedOptions = ["", ...options];

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
        {/*
         * optionsの中身がstring[]であればそのまま文字列を表示
         * optionsの中身がオブジェクトの配列であれば、valueKeyとlabelKeyを使って表示
         */}
        {formattedOptions?.map((item, index) => (
          <MenuItem
            value={
              typeof item === "string"
                ? item
                : (item[valueKey as keyof T] as string)
            }
            key={
              typeof item === "string"
                ? index
                : (item[valueKey as keyof T] as string)
            }
          >
            {typeof item === "string"
              ? item
              : (item[labelKey as keyof T] as string)}
          </MenuItem>
        ))}
      </MUISelect>
      {error && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

/** Selectコンポーネントは、SelectInnerをforwardRefでラップしてrefを渡す */
export const Select = forwardRef(SelectInner) as <T>(
  // eslint-disable-next-line no-unused-vars
  props: Props<T> & { ref?: React.Ref<HTMLSelectElement> }
) => ReturnType<typeof SelectInner>;
