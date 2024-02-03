import { SelectboxWithValidation } from "@/components/Atoms/SelectboxWithValidation";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ReportData } from "../../containers";

type Props = {
  value: string;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  data: string[];
};

export const TimeSelect = ({ value, onChange, data }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ReportData>();

  return (
    <div>
      <SelectboxWithValidation
        id="timeSelect"
        value={value}
        label="学習時間"
        onChange={onChange}
        error={errors.time?.message ? true : false}
        errorMessage={errors.time?.message}
      >
        {data.map((value, index) => {
          return (
            <MenuItem
              value={value}
              key={index}
              {...register("time", {
                required: "学習時間を選択してください",
              })}
            >
              {value}分
            </MenuItem>
          );
        })}
      </SelectboxWithValidation>
    </div>
  );
};
