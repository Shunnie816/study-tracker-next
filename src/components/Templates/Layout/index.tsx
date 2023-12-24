import React, { FC } from "react";
import { Header } from "../../Organisms/Header";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};
