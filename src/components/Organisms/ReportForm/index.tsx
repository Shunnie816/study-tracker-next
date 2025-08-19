import React from "react";
import {
  FormProvider,
  UseFormReturn,
  FieldErrors,
  Control,
} from "react-hook-form";
import { Alert } from "@/components/Atoms/Alert";
import { Button } from "@/components/Atoms/Button";
import { FormSelect } from "@/components/Molecules/FormSelect";
import { FormTextField } from "@/components/Molecules/FormTextField";
import { ReportData } from "@/components/Pages/Report/formSchema";
import { Textbook } from "@/libs/types";
import styles from "./index.module.scss";

type ReportFormProps = {
  methods: UseFormReturn<ReportData>;
  control: Control<ReportData>;
  errors: FieldErrors<ReportData>;
  textbooks: Textbook[];
  timeData: string[];
  // eslint-disable-next-line no-unused-vars
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
};

/** NOTE: 再利用するつもりはないので、nameやlabelは直接記述している */
export function ReportForm({
  methods,
  control,
  errors,
  textbooks,
  timeData,
  onSubmit,
  showAlert,
  setShowAlert,
  isDisabled,
}: ReportFormProps) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        {showAlert && (
          <Alert security="success" onClose={() => setShowAlert(false)}>
            記録完了！
          </Alert>
        )}
        <div className={styles.formsWrapper}>
          <FormSelect<string, ReportData>
            name="time"
            control={control}
            options={timeData}
            label="学習時間"
            error={!!errors.time}
            errorMessage={errors.time?.message}
          />
          <FormSelect<Textbook, ReportData>
            name="textbook"
            control={control}
            options={textbooks}
            valueKey="id"
            labelKey="name"
            label="教材"
            error={!!errors.textbook}
            errorMessage={errors.textbook?.message}
          />
          <FormTextField<ReportData>
            name="studyContent"
            control={control}
            label="学習内容"
            error={!!errors.studyContent}
            errorMessage={errors.studyContent?.message}
          />
        </div>
        <div className={styles.button}>
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled={isDisabled}
          >
            確定
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
