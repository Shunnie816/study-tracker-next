import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  formSchema,
  type ReportFormData,
} from "@/components/Pages/Report/formSchema";
import { SingleColumn } from "@/components/Templates/SingleColumn";
import { ReportForm } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof ReportForm> = {
  component: ReportForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "学習報告フォームのOrganismコンポーネント。バリデーションや教材選択に対応。",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ReportForm>;

const textbooks = [
  { id: "1", name: "テキスト1" },
  { id: "2", name: "テキスト2" },
];
const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString());
const minuteOptions = Array.from({ length: 12 }, (_, i) => (i * 5).toString());

const Template: Story["render"] = (args) => {
  const methods = useForm<ReportFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hour: "",
      minute: "",
      textbook: "",
      studyContent: "",
    },
    mode: "onBlur",
  });
  return (
    <SingleColumn title="SingleColumn">
      <ReportForm
        {...args}
        methods={methods}
        control={methods.control}
        errors={methods.formState.errors}
        textbooks={textbooks}
        hourOptions={hourOptions}
        minuteOptions={minuteOptions}
        onSubmit={methods.handleSubmit(() => Promise.resolve())}
      />
    </SingleColumn>
  );
};

export const Default: Story = {
  render: Template,
};
