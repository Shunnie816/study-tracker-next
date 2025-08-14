"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import React from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/Atoms/Button";
import { Heading } from "@/components/Atoms/Heading";
import { TextField } from "@/components/Atoms/TextField";
import { useRegister } from "../../../../libs/hooks/useRegister";
import { RegisteredBook } from "../presentations/RegisteredBook";
import {
  EditTextBookData,
  TextBookData,
  editForm,
  textbookForm,
} from "./formSchema";
import styles from "./index.module.scss";

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
    /** 教材IDを生成 */
    const id = uuidv4();

    postData({ id: id, name: data.textbook });

    /** formの値を初期値に戻す */
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
