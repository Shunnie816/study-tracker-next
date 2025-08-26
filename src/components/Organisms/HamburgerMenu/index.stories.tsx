import { Button } from "@/components/Atoms/Button";
import { useHamburgerMenu } from "@/components/Templates/Header/useHamburgerMenu";
import { HamburgerMenu } from "./index";
import type { Meta, StoryObj } from "@storybook/nextjs";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof HamburgerMenu> = {
  component: HamburgerMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "ハンバーガーメニューのOrganismコンポーネント。メニュー表示・切替に対応。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HamburgerMenu>;

const Component: Story["render"] = () => {
  const { isOpen, setIsOpen, menuItems, toggleDrawer } = useHamburgerMenu();
  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Open HamburgerMenu
      </Button>
      <HamburgerMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        menuItems={menuItems}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
};

export const Default: Story = {
  args: {},
  render: Component,
};
