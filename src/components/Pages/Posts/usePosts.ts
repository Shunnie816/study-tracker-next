import { useState } from "react";

export function usePosts() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    onClose();
  };
  return { isOpen, handleOpen, onClose, handleDelete };
}

export type UsePosts = ReturnType<typeof usePosts>;
