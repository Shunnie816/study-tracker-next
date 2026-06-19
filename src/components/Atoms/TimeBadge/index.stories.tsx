import { TimeBadge } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof TimeBadge> = {
  component: TimeBadge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TimeBadge>;

export const Hours: Story = {
  args: { time: "1時間30分" },
};

export const MinutesOnly: Story = {
  args: { time: "45分" },
};
