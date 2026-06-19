import { Card } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "カード表示用のAtomコンポーネント。variant で soft-shadow / bordered を切り替えられる。",
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

export const SoftShadow: Story = {
  args: {
    children: "フォームや統計カードに使用する",
    title: "Soft Shadow",
    variant: "soft-shadow",
  },
};

export const Bordered: Story = {
  args: {
    children: "記録一覧・教材リストに使用する",
    title: "Bordered",
    variant: "bordered",
  },
};
