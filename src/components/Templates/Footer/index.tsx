import { Box, Typography } from "@mui/material";
import React from "react";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Nekonoko. All rights are reserved.
      </Typography>
    </Box>
  );
}
