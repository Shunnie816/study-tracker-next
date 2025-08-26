import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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

type TextbookForm = {
  textbook: string;
};

const Component: Story["render"] = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEditDisabled, setIsEditDisabled] = useState<boolean>(false);

  const methods = useForm<TextbookForm>();

  useEffect(() => {
    setIsEditDisabled(
      !methods.formState.isValid ||
        methods.formState.isSubmitting ||
        !methods.formState.isDirty
    );
  }, [methods.formState]);

  const onClose = () => {
    setIsOpen(false);
    setIsDeleteOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button variant="contained" onClick={onOpen}>
        Open EditDialog
      </Button>
      <FormProvider {...methods}>
        <EditDialog<TextbookForm>
          name="textbook"
          label={"教材名"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onClose}
          onDelete={onClose}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          isEditDisabled={isEditDisabled}
        />
      </FormProvider>
    </div>
  );
};

export const Default: Story = {
  render: Component,
};
