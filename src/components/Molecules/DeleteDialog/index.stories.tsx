import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { DeleteDialog } from "./index";
import { Button } from "@/components/Atoms/Button";

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
      <Button variant="contained" onClick={onOpen}>
        Open DeleteDialog
      </Button>
      <DeleteDialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onClose}
        deleteTarget="投稿"
      />
    </div>
  );
};

export const Default: Story = {
  render: Component,
};
