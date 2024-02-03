import type { Meta, StoryObj } from "@storybook/react";
import { SelectboxWithValidation } from "./index";
import { MenuItem, SelectChangeEvent } from "@mui/material";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SelectboxWithValidation> = {
  component: SelectboxWithValidation,
};

export default meta;
type Story = StoryObj<typeof SelectboxWithValidation>;

const Component: Story["render"] = () => {
  let times: Array<number> = [];
  for (let i = 5; i <= 180; i += 5) {
    times.push(i);
  }

  return (
    <>
      <SelectboxWithValidation
        label="学習時間"
        value=""
        onChange={() => {}}
        error={false}
        errorMessage={""}
      >
        {times.map((value, index) => {
          return (
            <MenuItem value={value} key={index}>
              {value}分
            </MenuItem>
          );
        })}
      </SelectboxWithValidation>
    </>
  );
};

const ComponentWithError: Story["render"] = () => {
  let times: Array<number> = [];
  for (let i = 5; i <= 180; i += 5) {
    times.push(i);
  }

  return (
    <>
      <SelectboxWithValidation
        label="学習時間"
        value=""
        onChange={() => {}}
        error={true}
        errorMessage="学習時間を選択してください。"
      >
        {times.map((value, index) => {
          return (
            <MenuItem value={value} key={index}>
              {value}分
            </MenuItem>
          );
        })}
      </SelectboxWithValidation>
    </>
  );
};

const textbooks = ["英語", "数学", "国語", "社会", "理科"];

export const Default: Story = {
  render: Component,
};

export const WithError: Story = {
  render: ComponentWithError,
};
