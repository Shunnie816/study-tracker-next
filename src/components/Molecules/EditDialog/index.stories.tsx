import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { EditDialog } from "./index";
import { CustomButton } from "@/components/Atoms/CustomButton";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof EditDialog> = {
  component: EditDialog,
};

export default meta;
type Story = StoryObj<typeof EditDialog>;

const Component: Story["render"] = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [texbook, setTextbook] = useState<string>("");

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextbook(e.target.value);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CustomButton variant="contained" onClick={onOpen}>
        Open EditDialog
      </CustomButton>
      <EditDialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onClose}
        onDelete={onClose}
        textBook={texbook}
        onInput={onInput}
      />
    </div>
  );
};

export const Default: Story = {
  render: Component,
};
