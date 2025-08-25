import { useState } from "react";
import { ListMenuItem } from "@/components/Atoms/ListMenu";
import { URL_VALUES } from "@/libs/constants/url";

/**
 * ハンバーガーメニューの開閉状態を管理するカスタムフック
 */
export function useHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  const menuItems: ListMenuItem[] = [
    {
      label: "記録する",
      icon: "edit",
      href: URL_VALUES.REPORT,
    },
    {
      label: "教材登録",
      icon: "book",
      href: URL_VALUES.REGISTER,
    },
    {
      label: "学習記録一覧",
      icon: "school",
      href: URL_VALUES.POSTS,
    },
    {
      label: "学習時間",
      icon: "time",
      href: URL_VALUES.STUDYLOG,
    },
  ];

  return {
    isOpen,
    setIsOpen,
    toggleDrawer,
    menuItems,
  };
}

export type UseHamburgerMenu = ReturnType<typeof useHamburgerMenu>;
