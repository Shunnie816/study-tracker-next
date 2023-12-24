import type { Meta, StoryObj } from "@storybook/react";

import { DeleteDialog } from "./index";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof DeleteDialog> = {
  component: DeleteDialog,
};

export default meta;
type Story = StoryObj<typeof DeleteDialog>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
