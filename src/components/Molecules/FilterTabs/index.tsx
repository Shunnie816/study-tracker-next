import Box from "@mui/material/Box";
import React from "react";

export type FilterType = "all" | "thisWeek" | "thisMonth";

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: "all", label: "全て" },
  { value: "thisWeek", label: "今週" },
  { value: "thisMonth", label: "今月" },
];

type Props = {
  value: FilterType;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: FilterType) => void;
};

export function FilterTabs({ value, onChange }: Props) {
  return (
    <Box sx={{ display: "flex", gap: "6px" }}>
      {FILTER_OPTIONS.map((option) => (
        <Box
          key={option.value}
          component="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          sx={{
            px: "14px",
            py: "6px",
            borderRadius: "20px",
            border: value === option.value ? "none" : "1.5px solid #E2E4F0",
            backgroundColor: value === option.value ? "#4361EE" : "transparent",
            color: value === option.value ? "#FFFFFF" : "text.secondary",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            lineHeight: 1.5,
            transition: "all 0.15s ease",
            "&:hover": {
              backgroundColor: value === option.value ? "#3A55D9" : "#F0F3FF",
            },
          }}
        >
          {option.label}
        </Box>
      ))}
    </Box>
  );
}
