import { Box, Typography } from "@mui/material";
import React from "react";

export const Footer = () => {
  return (
    <Box component="footer" py={2} textAlign="center">
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Shun Yoshiya. All rights are reserved.
      </Typography>
    </Box>
  );
};
