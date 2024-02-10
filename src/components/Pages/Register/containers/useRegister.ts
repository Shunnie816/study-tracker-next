import { useState } from "react";

export const useRegister = () => {
  const [editName, setEditName] = useState<string>("");

  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(event.target.value);
  };

  const submitEdit = () => {
    alert("教材名を編集しました。");
  };

  const onDelete = () => {
    alert("教材を削除しました。");
  };

  return {
    editName,
    setEditName,
    handleEdit,
    submitEdit,
    onDelete,
  };
};

/** TODO: このコード調べる */
export type UseRegister = ReturnType<typeof useRegister>;
