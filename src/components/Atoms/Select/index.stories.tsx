import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./index";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

let times: Array<number> = [];
for (let i = 5; i <= 180; i += 5) {
  times.push(i);
}

const textbooks = ["英語", "数学", "国語", "社会", "理科"];

export const TimeSelect: Story = {
  args: {
    value: "",
    label: "学習時間",
    options: times,
    menuItemText: "分",
  },
};

export const TextbookSelect: Story = {
  args: {
    value: "",
    label: "教材選択",
    options: textbooks,
  },
};
