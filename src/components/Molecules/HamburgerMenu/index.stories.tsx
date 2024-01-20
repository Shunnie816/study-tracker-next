import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HamburgerMenu } from "./index";
import { CustomButton } from "@/components/Atoms/CustomButton";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof HamburgerMenu> = {
  component: HamburgerMenu,
};

export default meta;
type Story = StoryObj<typeof HamburgerMenu>;

/** storybook表示するならハンバーガーメニューの設計を考え直す必要があるかも */
const Component: Story["render"] = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <CustomButton variant="contained">Open HamburgerMenu</CustomButton>
      <HamburgerMenu state={isOpen} setState={setIsOpen} />
    </>
  );
};

export const Default: Story = {
  args: {},
  render: Component,
};
