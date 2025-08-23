"use client";
import { Typography } from "@mui/material";
import React from "react";
import { FormProvider } from "react-hook-form";
import { RegisterForm } from "@/components/Organisms/RegisterForm";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { RegisteredBook } from "../../Organisms/RegisteredBook";
import styles from "./index.module.scss";
import { useRegister } from "./useRegister";

export function Register() {
  const { onSubmit, TextbookFormMethods, EditTextbookFormMethods, textbooks } =
    useRegister();

  return (
    <SingleColumn title="教材登録">
      <FormProvider {...TextbookFormMethods}>
        <RegisterForm onSubmit={onSubmit} />
      </FormProvider>
      <FormProvider {...EditTextbookFormMethods}>
        <div className={styles.registered}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            fontWeight="bold"
          >
            登録済みの教材
          </Typography>
          <div className={styles.list}>
            {/* TODO: textbooksが[]で来た場合の対処 */}
            {textbooks ? (
              <RegisteredBook listData={textbooks} />
            ) : (
              <>登録された教材がありません</>
            )}
          </div>
        </div>
      </FormProvider>
    </SingleColumn>
  );
}
