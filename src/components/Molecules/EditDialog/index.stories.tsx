import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/Atoms/Button";
import { EditDialog } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof EditDialog> = {
  component: EditDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "編集ダイアログ用のMoleculeコンポーネント。編集・削除・バリデーションに対応。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EditDialog>;

const Component: Story["render"] = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { control, getValues } = useForm();

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button variant="contained" onClick={onOpen}>
        Open EditDialog
      </Button>
      <Controller
        control={control}
        name="editDialog"
        render={({ field }) => (
          <EditDialog
            {...field}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onClose}
            onDelete={onClose}
            textbook={getValues("editDialog")}
          />
        )}
      />
    </div>
  );
};

export const Default: Story = {
  render: Component,
};
