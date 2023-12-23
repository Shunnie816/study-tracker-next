import { FC, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./index";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const FirstStory: Story = {
  args: {},
};
