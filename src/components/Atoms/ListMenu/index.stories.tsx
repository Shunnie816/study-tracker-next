import { Meta, StoryObj } from "@storybook/nextjs";
import { ListMenu, ListMenuItem } from "./index";

const items: ListMenuItem[] = [
  { label: "記録する", icon: "edit", href: "/study-tracker" },
  { label: "教材登録", icon: "book", href: "/register" },
  { label: "学習記録", icon: "school", href: "/posts" },
  { label: "学習時間", icon: "time", href: "/study-log" },
];

const itemsNoIcon: ListMenuItem[] = [
  { label: "記録する", href: "/study-tracker" },
  { label: "教材登録", href: "/register" },
  { label: "学習記録", href: "/posts" },
  { label: "学習時間", href: "/study-log" },
];

const meta: Meta<typeof ListMenu> = {
  component: ListMenu,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ListMenu>;

export const Default: Story = {
  args: {
    items,
    onClick: () => alert("clicked!"),
    row: false,
  },
};

export const Row: Story = {
  args: {
    items,
    onClick: () => alert("clicked!"),
    row: true,
  },
};

export const NoIcon: Story = {
  args: {
    items: itemsNoIcon,
    onClick: () => alert("clicked!"),
    row: false,
  },
};
