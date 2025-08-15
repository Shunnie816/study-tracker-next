"use client";
import React from "react";
import ReportForm from "@/components/Organisms/ReportForm";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { useReport } from "./useReport";

export const Report = () => {
  const {
    methods,
    control,
    errors,
    textbooks,
    timeData,
    handleSubmit,
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
        timeData={timeData}
        onSubmit={handleSubmit}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        isDisabled={isDisabled}
      />
    </SingleColumn>
  );
};
