import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ReportForm from "./index";
import { useForm } from "react-hook-form";
import type { ReportData } from "@/components/Pages/Report/containers/formSchema";
import { SingleColumn } from "@/components/Templates/SingleColumn";

const meta: Meta<typeof ReportForm> = {
  component: ReportForm,
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
    defaultValues: {
      time: "",
      textbook: "",
      studyContent: "",
    },
    mode: "onChange",
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
