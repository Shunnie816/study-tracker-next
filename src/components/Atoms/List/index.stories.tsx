import { List } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof List> = {
  component: List,
};

export default meta;
type Story = StoryObj<typeof List>;

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
