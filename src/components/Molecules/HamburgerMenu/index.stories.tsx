import type { Meta, StoryObj } from "@storybook/react";

import { HamburgerMenu } from "./index";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof HamburgerMenu> = {
  component: HamburgerMenu,
};

export default meta;
type Story = StoryObj<typeof HamburgerMenu>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
