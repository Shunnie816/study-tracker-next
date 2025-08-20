import { Snackbar as MUISnackbar, SnackbarProps } from "@mui/material";

type Props = SnackbarProps;

/**
 * childrenにコンポーネントをラップすることでカスタマイズ可能
 * ex) <Snackbar {...args}><Alert severity="success">メッセージ</Alert></Snackbar>
 */
export function Snackbar(props: Props) {
  return <MUISnackbar autoHideDuration={6000} {...props} />;
}
