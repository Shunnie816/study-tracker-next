import { LoadingWrapper } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof LoadingWrapper> = {
  component: LoadingWrapper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "データ取得中のローディング状態を表示するコンポーネントです。useSWRのisLoadingとerrorを受け取り、ローディング中はスピナー、エラー時はエラーメッセージを表示します。",
      },
    },
  },
  argTypes: {
    isLoading: { control: "boolean" },
    error: { control: "object" },
    children: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof LoadingWrapper>;

export const Default: Story = {
  args: {
    isLoading: true,
    error: null,
    children: <div>データが表示されました。</div>,
  },
};

export const IsError: Story = {
  args: {
    isLoading: false,
    error: new Error("データ取得中にエラーが発生しました。"),
    children: <div>データが表示されました。</div>,
  },
};

export const Empty: Story = {
  args: {
    isLoading: false,
    error: null,
    children: <div>データが表示されました。</div>,
  },
};
