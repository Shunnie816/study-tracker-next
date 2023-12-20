import type { Meta, StoryObj } from "@storybook/react";

import { BasicList } from "./index";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BasicList> = {
  component: BasicList,
};

export default meta;
type Story = StoryObj<typeof BasicList>;

const textbooks = ["英語", "数学", "国語", "理科", "社会"];

export const Default: Story = {
  args: {
    items: textbooks,
  },
};

export const WithIcon: Story = {
  args: {
    items: textbooks,
    icon: true,
  },
};
