import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import styles from "./index.module.scss";

type Props = {
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
};

export function LoadingWrapper({ isLoading, error, children }: Props) {
  return isLoading ? (
    <div className={styles.loadingWrapper}>
      <CircularProgress />
    </div>
  ) : error ? (
    <Typography color="error">データ取得中にエラーが発生しました。</Typography>
  ) : (
    <>{children}</>
  );
}
