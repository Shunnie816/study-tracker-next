import { IconType } from "@/components/Atoms/Icon";
import { useState } from "react";

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

  const menuItems = [
    "ログイン",
    "記録する",
    "教材登録",
    "学習記録",
    "学習時間",
  ];
  const icons: IconType[] = ["login", "edit", "book", "school", "time"];
  const urlPath = ["/", "/", "/register", "/posts", "/study-log"];

  return {
    isOpen,
    setIsOpen,
    toggleDrawer,
    menuItems,
    icons,
    urlPath,
  };
}
