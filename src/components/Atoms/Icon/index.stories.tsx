import { Icon } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Icon> = {
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MUIアイコンをラップしたAtomコンポーネント。icon名とサイズをpropsで指定可能。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Edit: Story = {
  args: {
    icon: "edit",
    fontSize: "small",
  },
};

export const Delete: Story = {
  args: {
    icon: "delete",
    fontSize: "small",
  },
};

export const Menu: Story = {
  args: {
    icon: "menu",
    fontSize: "small",
  },
};

export const Login: Story = {
  args: {
    icon: "login",
    fontSize: "small",
  },
};

export const Book: Story = {
  args: {
    icon: "book",
    fontSize: "small",
  },
};

export const School: Story = {
  args: {
    icon: "school",
    fontSize: "small",
  },
};

export const Time: Story = {
  args: {
    icon: "time",
    fontSize: "small",
  },
};
