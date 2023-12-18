import type { Meta, StoryObj } from "@storybook/react";

import { BaseCard, Props } from "./index";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BaseCard> = {
  component: BaseCard,
};

export default meta;
type Story = StoryObj<typeof BaseCard>;

export const Default: Story = {
  args: {
    children: "サンプル",
    title: "カード",
  },
};
