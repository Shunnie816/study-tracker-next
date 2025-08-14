import Alert from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Alert> = {
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MUIのAlertをラップしたコンポーネント。アイコンとseverityを指定できます。",
      },
    },
  },
  argTypes: {
    severity: {
      control: "select",
      options: ["success", "info", "warning", "error"],
    },
    icon: {
      control: "select",
      options: ["check", "info", "warning", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    severity: "success",
    children: "操作が正常に完了しました。",
  },
};

export const Info: Story = {
  args: {
    severity: "info",
    children: "ご参考情報です。",
  },
};

export const Warning: Story = {
  args: {
    severity: "warning",
    children: "注意が必要です。",
  },
};

export const Error: Story = {
  args: {
    severity: "error",
    children: "エラーが発生しました。",
  },
};
