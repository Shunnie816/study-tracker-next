import { TextField } from "../TextField/index";
import type { Meta, StoryObj } from "@storybook/nextjs";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof TextField> = {
  component: TextField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "テキスト入力用のAtomコンポーネント。入力背景色 #EAECF5・ラベル常時上部配置をデフォルト適用。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: "学習内容を入力",
    variant: "outlined",
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
    errorMessage: "学習内容を入力してください",
  },
};
