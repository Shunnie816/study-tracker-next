import { Alert as MUIAlert, AlertProps } from "@mui/material";
import React from "react";

type Props = {
  severity: "success" | "error" | "info" | "warning";
} & AlertProps;

export function Alert({ severity, ...rest }: Props) {
  return <MUIAlert severity={severity} {...rest} />;
}
