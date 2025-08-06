import Select from "@/components/Atoms/Select";
import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

type FormSelectProps<O, T extends FieldValues = FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: O[];
  valueKey?: keyof O;
  labelKey?: keyof O;
  label: string;
  disabled?: boolean;
  error: boolean;
  errorMessage?: string;
};

export default function FormSelect<O, T extends FieldValues = FieldValues>({
  name,
  control,
  options,
  valueKey,
  labelKey,
  label,
  disabled = false,
  error,
  errorMessage,
}: FormSelectProps<O, T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          label={label}
          options={options}
          valueKey={valueKey}
          labelKey={labelKey}
          error={error}
          errorMessage={errorMessage}
          disabled={disabled}
        />
      )}
    />
  );
}
