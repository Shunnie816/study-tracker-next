import { Box, Container } from "@mui/material";
import React from "react";
import { Heading } from "@/components/Atoms/Heading";
import styles from "./index.module.scss";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const SingleColumn = ({ title, children }: Props) => {
  return (
    <Container maxWidth="sm" className={styles.container}>
      <Heading text={title} />
      <Box mt={2} mb={4}>
        {children}
      </Box>
    </Container>
  );
};
