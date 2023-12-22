import type { Meta, StoryObj } from "@storybook/react";

import { BaseIcon } from "./index";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BaseIcon> = {
  component: BaseIcon,
};

export default meta;
type Story = StoryObj<typeof BaseIcon>;

export const Edit: Story = {
  args: {
    icon: "edit",
    fontSize: "small",
  },
};

export const Delete: Story = {
  args: {
    icon: "delete",
    fontSize: "small",
  },
};
