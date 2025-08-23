import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/Atoms/Button";
import { FormTextField } from "@/components/Molecules/FormTextField";
import { TextBookData } from "@/components/Pages/Register/formSchema";
import { UseRegister } from "@/components/Pages/Register/useRegister";
import styles from "./index.module.scss";

export type Props = Pick<UseRegister, "onSubmit">;

export function RegisterForm({ onSubmit }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TextBookData>();

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <FormTextField
        control={control}
        name="textbook"
        label="教材を入力"
        error={!!errors.textbook}
        errorMessage={errors.textbook?.message}
      />
      <div className={styles.button}>
        <Button variant="contained" type="submit">
          登録する
        </Button>
      </div>
    </form>
  );
}
