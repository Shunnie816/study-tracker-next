import { SnackbarCloseReason } from "@mui/material";
import React, { useState } from "react";
import { Button } from "../Button";
import { Snackbar } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Snackbar> = {
  component: Snackbar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MUIのSnackbarをラップしたコンポーネント。メッセージ表示や自動非表示に対応しています。ボタン押下で表示する例も含みます。Alertコンポーネントをラップするパターンもある。",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Snackbarの表示状態",
    },
    message: {
      control: "text",
      description: "表示するメッセージ",
    },
    anchorOrigin: {
      control: "object",
      description: "表示位置 (top/bottom, left/right)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

const Component = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button variant="contained" onClick={handleOpen}>
        Show Snackbar
      </Button>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="ボタン押下で表示されるSnackbarです。"
      />
    </div>
  );
};

export const WithButton: Story = {
  render: (args) => <Component {...args} />,
};

export const Default: Story = {
  args: {
    open: true,
    message: "操作が完了しました。",
  },
};

export const TopRight: Story = {
  args: {
    open: true,
    message: "右上に表示されるSnackbarです。",
    anchorOrigin: { vertical: "top", horizontal: "right" },
  },
};

export const BottomCenter: Story = {
  args: {
    open: true,
    message: "中央下部に表示されるSnackbarです。",
    anchorOrigin: { vertical: "bottom", horizontal: "center" },
  },
};

export const WithAlert: Story = {
  args: {
    open: true,
    withAlert: true,
    alertMessage: "投稿が削除されました",
    severity: "success",
    onClose: () => {},
  },
};
