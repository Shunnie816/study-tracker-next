import { Alert as MUIAlert, AlertProps } from "@mui/material";
import React from "react";

type Props = {
  security: "success" | "error" | "info" | "warning";
} & AlertProps;

export function Alert({ security, ...rest }: Props) {
  return <MUIAlert severity={security} {...rest} />;
}
