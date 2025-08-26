import { Heading } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Heading> = {
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "見出し用のAtomコンポーネント。テキストをpropsで指定可能。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    text: "見出し",
  },
};
