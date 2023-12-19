import React, { FC } from "react";
import { Header } from "../../Organisms/Header";
import styles from "./index.module.scss";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.container}>{children}</div>
    </>
  );
};
