import {
  Alert,
  Snackbar as MUISnackbar,
  SnackbarCloseReason,
  SnackbarProps,
} from "@mui/material";

type Props = {
  withAlert?: boolean;
  alertMessage?: string;
  severity?: "success" | "error" | "info" | "warning";
  onClose: (
    // eslint-disable-next-line no-unused-vars
    event: React.SyntheticEvent | Event,
    // eslint-disable-next-line no-unused-vars
    reason?: SnackbarCloseReason
  ) => void;
} & SnackbarProps;

export function Snackbar({
  withAlert = false,
  alertMessage,
  severity,
  onClose,
  ...props
}: Props) {
  return (
    <>
      {withAlert ? (
        <MUISnackbar autoHideDuration={6000} onClose={onClose} {...props}>
          <Alert severity={severity} onClose={onClose}>
            {alertMessage}
          </Alert>
        </MUISnackbar>
      ) : (
        <MUISnackbar autoHideDuration={6000} {...props} />
      )}
    </>
  );
}
