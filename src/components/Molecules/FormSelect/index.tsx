import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Select } from "@/components/Atoms/Select";

/**
 * O: MenuItemに格納する値の型
 * T: React Hook FormのFieldValues型(formのデータ型)
 */
type FormSelectProps<O, T extends FieldValues> = {
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

export function FormSelect<O, T extends FieldValues>({
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
