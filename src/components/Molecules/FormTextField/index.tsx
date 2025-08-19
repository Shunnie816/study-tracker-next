import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { TextField } from "@/components/Atoms/TextField_old";

type FormTextFieldProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  defaultValue?: string;
  disabled?: boolean;
  error: boolean;
  errorMessage?: string;
  type?: string;
};

export default function FormTextField<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  disabled = false,
  error = false,
  errorMessage,
  type = "text",
}: FormTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={error}
          disabled={disabled}
          errorMessage={errorMessage}
          type={type}
        />
      )}
    />
  );
}
