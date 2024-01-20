import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DeleteDialog } from "./index";
import { CustomButton } from "@/components/Atoms/CustomButton";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof DeleteDialog> = {
  component: DeleteDialog,
};

export default meta;
type Story = StoryObj<typeof DeleteDialog>;

const Component: Story["render"] = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CustomButton variant="contained" onClick={onOpen}>
        Open DeleteDialog
      </CustomButton>
      <DeleteDialog isOpen={isOpen} onClose={onClose} onSubmit={onClose} />
    </div>
  );
};

export const Default: Story = {
  render: Component,
};
