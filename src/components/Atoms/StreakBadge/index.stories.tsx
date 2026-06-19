import type { Meta, StoryObj } from "@storybook/nextjs";
import { StreakBadge } from "./index";

const meta: Meta<typeof StreakBadge> = {
  component: StreakBadge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StreakBadge>;

export const Single: Story = {
  args: { streak: 1 },
};

export const Week: Story = {
  args: { streak: 7 },
};

export const Long: Story = {
  args: { streak: 30 },
};
