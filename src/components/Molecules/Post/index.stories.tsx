import type { Meta, StoryObj } from "@storybook/nextjs";

import { Post } from "./index";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Post> = {
  component: Post,
};

export default meta;
type Story = StoryObj<typeof Post>;

export const FirstStory: Story = {
  args: {
    date: "2023/12/24",
    textbook: "英語",
    time: "60",
    content: "学習内容はこちらです。",
  },
};
