import React from "react";
import { useFormContext } from "react-hook-form";
import { ReportData } from "../../containers";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type BaseProps = {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  data: string[];
};

export const TimeSelect = ({ value, data, onChange }: BaseProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ReportData>();

  return (
    <div>
      <FormControl fullWidth error={errors.time?.message ? true : false}>
        <InputLabel id="学習時間">学習時間</InputLabel>
        <Select
          labelId="学習時間"
          id="timeSelect"
          label="学習時間"
          value={value}
          {...register("time", {
            required: "学習時間を選択してください",
          })}
          onChange={onChange}
        >
          {data.map((value, index) => {
            return (
              <MenuItem value={value} key={index}>
                {value}分
              </MenuItem>
            );
          })}
        </Select>
        {errors.time && <FormHelperText>{errors.time?.message}</FormHelperText>}
      </FormControl>
    </div>
  );
};
