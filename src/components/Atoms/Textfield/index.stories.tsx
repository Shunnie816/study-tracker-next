import { TextField } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof TextField> = {
  component: TextField,
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
