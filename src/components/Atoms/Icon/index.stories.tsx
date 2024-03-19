import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "./index";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Icon> = {
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

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

export const Menu: Story = {
  args: {
    icon: "menu",
    fontSize: "small",
  },
};
