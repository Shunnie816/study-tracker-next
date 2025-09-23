import { Alert } from "@mui/material";
import React from "react";
import {
  FormProvider,
  UseFormReturn,
  FieldErrors,
  Control,
} from "react-hook-form";
import { Button } from "@/components/Atoms/Button";
import { FormSelect } from "@/components/Molecules/FormSelect";
import { FormTextField } from "@/components/Molecules/FormTextField";
import { ReportFormData } from "@/components/Pages/Report/formSchema";
import { Textbook } from "@/libs/types";
import styles from "./index.module.scss";

type ReportFormProps = {
  methods: UseFormReturn<ReportFormData>;
  control: Control<ReportFormData>;
  errors: FieldErrors<ReportFormData>;
  textbooks: Textbook[];
  hourOptions: string[];
  minuteOptions: string[];
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
  hourOptions,
  minuteOptions,
  onSubmit,
  showAlert,
  setShowAlert,
  isDisabled,
}: ReportFormProps) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        {showAlert && (
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            記録完了！
          </Alert>
        )}
        <div className={styles.formsWrapper}>
          <div className={styles.timeSelect}>
            <FormSelect<string, ReportFormData>
              name="hour"
              control={control}
              options={hourOptions}
              label="時間"
              error={!!errors.hour}
              errorMessage={errors.hour?.message}
            />
            <FormSelect<string, ReportFormData>
              name="minute"
              control={control}
              options={minuteOptions}
              label="分"
              error={!!errors.minute}
              errorMessage={errors.minute?.message}
            />
          </div>
          <FormSelect<Textbook, ReportFormData>
            name="textbook"
            control={control}
            options={textbooks}
            valueKey="id"
            labelKey="name"
            label="教材"
            error={!!errors.textbook}
            errorMessage={errors.textbook?.message}
          />
          <FormTextField<ReportFormData>
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
