"use client";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Snackbar } from "@/components/Atoms/Snackbar";
import { RegisterForm } from "@/components/Organisms/RegisterForm";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { RegisteredBook } from "../../Organisms/RegisteredBook";
import { useRegister } from "./useRegister";

export function Register() {
  const {
    TextbookFormMethods,
    EditFormMethods,
    onSubmitRegister,
    onSubmitEdit,
    handleDelete,
    isDeleteOpen,
    isEditOpen,
    onCloseEditDialog,
    handleOpenEditDialog,
    setIsDeleteOpen,
    textbooks,
    showRegisterAlert,
    setShowRegisterAlert,
    isDeleteSuccess,
    handleSnackbarClose,
    isEditSuccess,
    isEditDisabled,
    isLoading,
    error,
  } = useRegister();

  return (
    <SingleColumn title="教材登録">
      <FormProvider {...TextbookFormMethods}>
        <RegisterForm
          onSubmitRegister={onSubmitRegister}
          showRegisterAlert={showRegisterAlert}
          setShowRegisterAlert={setShowRegisterAlert}
        />
      </FormProvider>
      <FormProvider {...EditFormMethods}>
        <RegisteredBook
          listData={textbooks}
          onSubmitEdit={onSubmitEdit}
          handleDelete={handleDelete}
          isDeleteOpen={isDeleteOpen}
          isEditOpen={isEditOpen}
          onCloseEditDialog={onCloseEditDialog}
          handleOpenEditDialog={handleOpenEditDialog}
          setIsDeleteOpen={setIsDeleteOpen}
          isEditDisabled={isEditDisabled}
          isLoading={isLoading}
          error={error}
        />
      </FormProvider>
      <Snackbar
        open={isDeleteSuccess}
        onClose={handleSnackbarClose}
        withAlert
        alertMessage="教材が削除されました"
        severity="success"
      />
      <Snackbar
        open={isEditSuccess}
        onClose={handleSnackbarClose}
        withAlert
        alertMessage="教材が編集されました"
        severity="success"
      />
    </SingleColumn>
  );
}
