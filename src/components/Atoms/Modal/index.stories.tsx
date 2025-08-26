import React, { useState } from "react";
import { Button } from "../Button";
import { Modal } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "ダイアログ表示用のAtomコンポーネント。開閉状態や内容をpropsで制御可能。",
      },
    },
  },
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
      <Button variant="contained" onClick={onOpen}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} title={"タイトル"}>
        内容がここに表示されます
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: Component,
};
