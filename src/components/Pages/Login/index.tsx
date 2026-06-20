"use client";
import { Box, Button, Paper, Typography } from "@mui/material";
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
        bgcolor: "#fcffe9",
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: 360, overflow: "hidden", borderRadius: 2 }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #3A0CA3 0%, #4361EE 100%)",
            py: 4,
            px: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
            Study Tracker
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)" }}>
            学習記録・管理アプリ
          </Typography>
        </Box>

        <Box
          sx={{
            px: 4,
            py: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            ログインして学習記録を始めましょう
          </Typography>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={signInWithGoogle}
            sx={{ textTransform: "none", py: 1.5 }}
          >
            Google でログイン
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
