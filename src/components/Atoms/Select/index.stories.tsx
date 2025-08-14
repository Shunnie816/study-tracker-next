import type { Meta, StoryObj } from "@storybook/nextjs";
import { Select } from "./index";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const textbooks = ["英語", "数学", "国語", "社会", "理科"];

type Fruit = { id: string; name: string };

// オブジェクト配列のoptions
const fruits: Fruit[] = [
  { id: "1", name: "りんご" },
  { id: "2", name: "みかん" },
  { id: "3", name: "バナナ" },
];

export const TextbookSelect: Story = {
  args: {
    value: "",
    label: "教材選択",
    options: textbooks,
  },
};

export const ObjectOptionsSelect: Story = {
  args: {
    value: "2",
    label: "果物選択",
    options: fruits,
    valueKey: "id" as any,
    labelKey: "name" as any,
  },
};

// valueが選択済みの状態
export const SelectedValue: Story = {
  args: {
    value: "数学",
    label: "教材選択",
    options: textbooks,
  },
};

// error表示
export const ErrorSelect: Story = {
  args: {
    value: "",
    label: "エラー例",
    options: ["A", "B", "C"],
    error: true,
    errorMessage: "選択してください",
  },
};
