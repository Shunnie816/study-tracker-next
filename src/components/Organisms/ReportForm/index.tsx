import React from "react";
import {
  FormProvider,
  UseFormReturn,
  FieldErrors,
  Control,
} from "react-hook-form";
import { Button } from "@/components/Atoms/Button";
import FormSelect from "@/components/Molecules/FormSelect";
import FormTextField from "@/components/Molecules/FormTextField";
import { ReportData } from "@/components/Pages/Report/formSchema";
import { Textbook } from "@/pages/api/textbook";
import styles from "./index.module.scss";

type ReportFormProps = {
  methods: UseFormReturn<ReportData>;
  control: Control<ReportData>;
  errors: FieldErrors<ReportData>;
  textbooks: Textbook[];
  timeData: string[];
  // eslint-disable-next-line no-unused-vars
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
};

/** NOTE: 再利用するつもりはないので、nameやlabelは直接記述している */
export default function ReportForm({
  methods,
  control,
  errors,
  textbooks,
  timeData,
  onSubmit,
}: ReportFormProps) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
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
          <Button variant="contained" type="submit" size="large">
            確定
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
