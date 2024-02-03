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

export const TextbookSelect = ({ value, onChange, data }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ReportData>();

  return (
    <div>
      <SelectboxWithValidation
        id="textbookSelect"
        value={value}
        label="教材選択"
        onChange={onChange}
        error={errors.textbook?.message ? true : false}
        errorMessage={errors.textbook?.message}
      >
        {data.map((value, index) => {
          return (
            <MenuItem
              value={value}
              key={index}
              {...register("textbook", {
                required: "教材を選択してください",
              })}
            >
              {value}
            </MenuItem>
          );
        })}
      </SelectboxWithValidation>
    </div>
  );
};
