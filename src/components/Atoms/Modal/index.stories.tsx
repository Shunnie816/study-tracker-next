import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./index";
import { CustomButton } from "../CustomButton";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

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
        Open Modal
      </CustomButton>
      <Modal isOpen={isOpen} onClose={onClose} title={"タイトル"}>
        内容がここに表示されます
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: Component,
};
