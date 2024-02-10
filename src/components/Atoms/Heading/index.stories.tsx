import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "./index";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Heading> = {
  component: Heading,
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    text: "見出し",
  },
};
