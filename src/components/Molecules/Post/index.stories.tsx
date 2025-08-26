import { Post } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Post> = {
  component: Post,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "学習記録表示用のMoleculeコンポーネント。日付・教材・内容などを表示。",
      },
    },
  },
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
