"use client";
import React from "react";
import styles from "./index.module.scss";
import { Typography } from "@mui/material";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Button } from "@/components/Atoms/Button";
import { Heading } from "@/components/Atoms/Heading";
import { TextField } from "@/components/Atoms/TextField";
import {
  EditTextBookData,
  TextBookData,
  editForm,
  textbookForm,
} from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisteredBook } from "../presentations/RegisteredBook";
import { useRegister } from "./useRegister";

export const Register = () => {
  const { textbooks, postData } = useRegister();

  const {
    formState: { errors },
    control,
    handleSubmit,
    getValues,
    reset,
  } = useForm<TextBookData>({
    resolver: zodResolver(textbookForm),
    defaultValues: { textbook: "" },
  });

  const methods = useForm<EditTextBookData>({
    resolver: zodResolver(editForm),
    defaultValues: { textbook: "" },
  });

  const onSubmit: SubmitHandler<TextBookData> = (data) => {
    console.log("data", data);
    reset();
  };

  return (
    <div className={styles.container}>
      <Heading text="教材登録" />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          control={control}
          name="textbook"
          render={({ field }) => (
            <TextField
              {...field}
              label={"学習内容を入力"}
              value={getValues("textbook")}
              error={errors.textbook && true}
              errorMessage={errors.textbook?.message}
            />
          )}
        />
        <div className={styles.button}>
          <Button variant="contained" type="submit">
            登録する
          </Button>
        </div>
      </form>
      <FormProvider {...methods}>
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
    </div>
  );
};
