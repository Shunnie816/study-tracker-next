import type { Meta, StoryObj } from "@storybook/react";

import { Selectbox } from "./index";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Selectbox> = {
  component: Selectbox,
};

export default meta;
type Story = StoryObj<typeof Selectbox>;

let times: Array<number> = [];
for (let i = 5; i <= 180; i += 5) {
  times.push(i);
}

const textbooks = ["英語", "数学", "国語", "社会", "理科"];

export const TimeSelect: Story = {
  args: {
    value: "",
    label: "学習時間",
    items: times,
    menuItemText: "分",
    error: false,
    errorMessage: "学習時間を選択してください。",
  },
};

export const TimeSelectWithError: Story = {
  args: {
    value: "",
    label: "学習時間",
    items: times,
    menuItemText: "分",
    error: true,
    errorMessage: "学習時間を選択してください。",
  },
};

export const TextbookSelect: Story = {
  args: {
    value: "",
    label: "教材選択",
    items: textbooks,
    error: false,
    errorMessage: "教材を選択してください。",
  },
};

export const TextbookSelectWithError: Story = {
  args: {
    value: "",
    label: "教材選択",
    items: textbooks,
    error: true,
    errorMessage: "教材を選択してください。",
  },
};
