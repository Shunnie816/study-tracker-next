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

type Props = {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  data: string[];
};

export const TextbookSelect = ({ value, onChange, data }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ReportData>();

  return (
    <div>
      <FormControl fullWidth error={errors.textbook?.message ? true : false}>
        <InputLabel id="教材選択">教材選択</InputLabel>
        <Select
          labelId="教材選択"
          id="textbookSelect"
          label="教材選択"
          value={value}
          {...register("textbook", {
            required: "教材を選択してください",
          })}
          onChange={onChange}
        >
          {data.map((value, index) => {
            return (
              <MenuItem value={value} key={index}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
        {errors.textbook && (
          <FormHelperText>{errors.textbook?.message}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
};
