import React from "react";
import { Box, Container } from "@mui/material";
import styles from "./index.module.scss";
import { Heading } from "@/components/Atoms/Heading";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const SingleColumn = ({ title, children  }: Props) => {
  return (
    <Container maxWidth="sm" className={styles.container}>
      <Heading text={title} />
      <Box mt={2} mb={4}> 
      {children}
      </Box>
    </Container>
  );
};
