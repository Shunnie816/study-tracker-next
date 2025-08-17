import { Card } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Card> = {
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "カード表示用のAtomコンポーネント。タイトルや内容をpropsで指定可能。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: "サンプル",
    title: "カード",
  },
};
