import React, { forwardRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

type BaseProps = {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  error: boolean;
  errorMessage: string | undefined;
  children: React.ReactNode;
};

type SelectProps = React.ComponentPropsWithoutRef<"select">;
type Props = BaseProps & Omit<SelectProps, keyof BaseProps>;

// eslint-disable-next-line react/display-name
export const SelectboxWithValidation = forwardRef(
  (
    { id, label, value, error, errorMessage, onChange, children }: Props,
    ref
  ) => {
    return (
      <FormControl fullWidth error={error}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          id={id}
          label={label}
          value={value}
          onChange={onChange}
          ref={ref}
        >
          {children}
        </Select>
        {error && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    );
  }
);
