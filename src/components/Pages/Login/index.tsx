"use client";
import { Box, Button, Typography, Paper } from "@mui/material";
import React from "react";
import { useAuth } from "@/libs/hooks/useAuth";

export function LoginPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Study Tracker
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ログインして学習記録を始めましょう
        </Typography>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={signInWithGoogle}
          sx={{ textTransform: "none" }}
        >
          Google でログイン
        </Button>
      </Paper>
    </Box>
  );
}
