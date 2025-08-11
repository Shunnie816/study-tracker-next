import { useHamburgerMenu } from "@/components/Templates/Header/useHamburgerMenu";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { HamburgerMenu } from "./index";
import { Button } from "@/components/Atoms/Button";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof HamburgerMenu> = {
  component: HamburgerMenu,
};

export default meta;
type Story = StoryObj<typeof HamburgerMenu>;

const Component: Story["render"] = () => {
  const { isOpen, setIsOpen, menuItems, icons, urlPath, toggleDrawer } =
    useHamburgerMenu();
  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Open HamburgerMenu
      </Button>
      <HamburgerMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        menuItems={menuItems}
        icons={icons}
        urlPath={urlPath}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
};

export const Default: Story = {
  args: {},
  render: Component,
};
