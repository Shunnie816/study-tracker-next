"use client";
import React from "react";
import { ReportForm } from "@/components/Organisms/ReportForm";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { useReport } from "./useReport";

export function Report() {
  const {
    methods,
    control,
    errors,
    textbooks,
    hourOptions,
    minuteOptions,
    onSubmit,
    showAlert,
    setShowAlert,
    isDisabled,
  } = useReport();

  return (
    <SingleColumn title="学習記録">
      <ReportForm
        methods={methods}
        control={control}
        errors={errors}
        textbooks={textbooks}
        hourOptions={hourOptions}
        minuteOptions={minuteOptions}
        onSubmit={onSubmit}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        isDisabled={isDisabled}
      />
    </SingleColumn>
  );
}
