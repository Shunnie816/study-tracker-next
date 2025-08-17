import { TextField } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof TextField> = {
  component: TextField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "テキスト入力用のAtomコンポーネント。propsでラベルやバリデーションを指定可能。",
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
