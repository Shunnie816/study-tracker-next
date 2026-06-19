import { Button } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "ボタン用のAtomコンポーネント。ラベルやアイコン、バリアントをpropsで指定可能。CTA ボタンは color=\"secondary\"（Amber）を使用する。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Standard: Story = {
  args: {
    children: "サンプル",
  },
};

export const CTA: Story = {
  args: {
    children: "学習を記録する",
    variant: "contained",
    color: "secondary",
  },
};

export const StandardSizeS: Story = {
  args: {
    ...Standard.args,
    size: "small",
  },
};

export const TextButton: Story = {
  args: {
    ...Standard.args,
    variant: "text",
  },
};

export const Outlined: Story = {
  args: {
    ...Standard.args,
    variant: "outlined",
  },
};

export const OutlinedSizeS: Story = {
  args: {
    ...Standard.args,
    variant: "outlined",
    size: "small",
  },
};

export const Delete: Story = {
  args: {
    ...Standard.args,
    variant: "outlined",
    color: "error",
    size: "small",
  },
};

export const Disabled: Story = {
  args: {
    ...Standard.args,
    variant: "contained",
    disabled: true,
  },
};
