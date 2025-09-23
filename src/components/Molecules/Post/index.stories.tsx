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
    data: {
      id: "1",
      date: "2024/01/01 12:00",
      textbook: { id: "textbook1", name: "Reactの教科書" },
      content: "Reactの基礎を学習しました。",
      time: "1時間30分",
    },
  },
};
