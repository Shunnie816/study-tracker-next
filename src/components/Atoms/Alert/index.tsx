import { Alert as MUIAlert, AlertProps } from "@mui/material";
import React from "react";

export default function Alert({ severity, ...rest }: AlertProps) {
  return <MUIAlert severity={severity} {...rest} />;
}
