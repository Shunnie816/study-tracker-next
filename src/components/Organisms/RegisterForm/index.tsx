import { Alert } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/Atoms/Button";
import { FormTextField } from "@/components/Molecules/FormTextField";
import { TextBookData } from "@/components/Pages/Register/formSchema";
import { UseRegister } from "@/components/Pages/Register/useRegister";
import styles from "./index.module.scss";

export type Props = Pick<
  UseRegister,
  "onSubmitRegister" | "showRegisterAlert" | "setShowRegisterAlert"
>;

export function RegisterForm({
  onSubmitRegister,
  showRegisterAlert,
  setShowRegisterAlert,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TextBookData>();

  return (
    <form onSubmit={onSubmitRegister} className={styles.formWrapper}>
      <div className={styles.form}>
        {showRegisterAlert && (
          <Alert severity="success" onClose={() => setShowRegisterAlert(false)}>
            教材登録完了！
          </Alert>
        )}
        <FormTextField
          control={control}
          name="textbook"
          label="教材を入力"
          error={!!errors.textbook}
          errorMessage={errors.textbook?.message}
        />
      </div>
      <div className={styles.button}>
        <Button variant="contained" type="submit">
          登録する
        </Button>
      </div>
    </form>
  );
}
