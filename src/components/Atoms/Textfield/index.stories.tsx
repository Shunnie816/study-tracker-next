import type { Meta, StoryObj } from "@storybook/react";
import { Textfield } from "./index";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Textfield> = {
  component: Textfield,
};

export default meta;
type Story = StoryObj<typeof Textfield>;

export const Default: Story = {
  args: {
    label: "学習内容を入力",
    variant: "outlined",
    //   onInput: React.ChangeEventHandler<HTMLInputElement>;
    //   value:
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
    helperText: "学習内容を入力してください",
  },
};
