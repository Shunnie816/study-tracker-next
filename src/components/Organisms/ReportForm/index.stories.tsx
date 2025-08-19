import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  formSchema,
  type ReportData,
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
const timeData = ["30分", "1時間", "2時間"];

const Template: Story["render"] = (args) => {
  const methods = useForm<ReportData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: "",
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
        timeData={timeData}
        onSubmit={methods.handleSubmit(() => Promise.resolve())}
      />
    </SingleColumn>
  );
};

export const Default: Story = {
  render: Template,
};
