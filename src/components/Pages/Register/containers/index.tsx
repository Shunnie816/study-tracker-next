"use client";
import React, { useState } from "react";
import styles from "./index.module.scss";
import { TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomButton } from "@/components/Atoms/CustomButton";
import { List } from "@/components/Atoms/List";
import { EditDialog } from "@/components/Molecules/EditDialog";
import { useRegister } from "./useRegister";
import { Heading } from "@/components/Atoms/Heading";

type TextbookType = {
  textbook: string;
};

export const Register = () => {
  const [textbook, setTextbook] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TextbookType>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextbook(event.target.value);
  };

  const onSubmit: SubmitHandler<TextbookType> = (data) => {
    console.log("data", data);
    setTextbook("");
  };

  const { editName, setEditName, handleEdit, submitEdit, onDelete } =
    useRegister();

  const sampleTextbookData = [
    "typescript",
    "Next.js",
    "React",
    "storybook",
    "tailwind.css",
  ];

  return (
    <div className={styles.container}>
      <Heading text="教材登録" />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TextField
          {...register("textbook", {
            required: "教材名が入力されていません",
          })}
          label="教材名を入力"
          variant="outlined"
          value={textbook}
          onChange={handleChange}
          error={errors.textbook?.message ? true : false}
          helperText={errors.textbook?.message}
          fullWidth
        />
        <div className={styles.button}>
          <CustomButton variant="contained" type="submit">
            登録する
          </CustomButton>
        </div>
      </form>
      <div className={styles.registered}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          登録済みの教材
        </Typography>
        <div className={styles.list}>
          <List
            items={sampleTextbookData}
            icon
            onClick={() => setIsOpen(true)}
          />
          <EditDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSubmit={submitEdit}
            onDelete={onDelete}
            textBook={editName}
            onInput={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};
