"use client";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "@/libs/hooks/useAuth";

function AppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect
        x="5"
        y="4"
        width="18"
        height="20"
        rx="3"
        fill="white"
        opacity=".95"
      />
      <line
        x1="9"
        y1="10"
        x2="19"
        y2="10"
        stroke="#4361EE"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="14"
        x2="19"
        y2="14"
        stroke="#4361EE"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="18"
        x2="15"
        y2="18"
        stroke="#4361EE"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function LoginPage() {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F6FC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 390, overflow: "hidden" }}>
        {/* Hero */}
        <Box
          sx={{
            background:
              "linear-gradient(155deg, #3A0CA3 0%, #4361EE 55%, #748FFC 100%)",
            padding: "52px 32px 40px",
            textAlign: "center",
            borderRadius: "16px 16px 0 0",
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              background: "rgba(255,255,255,.18)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <AppIcon />
          </Box>
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-.02em",
              mb: "4px",
            }}
          >
            Study Tracker
          </Typography>
          <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>
            学習記録を、もっとシンプルに。
          </Typography>
        </Box>

        {/* Card overlap area */}
        <Box
          sx={{
            bgcolor: "#F5F6FC",
            padding: "0 20px 28px",
            mt: "-16px",
            borderRadius: "0 0 16px 16px",
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: "16px",
              padding: "22px 18px",
              boxShadow: "0 2px 12px rgba(67,97,238,.10)",
              position: "relative",
              top: "-16px",
              mb: "-16px",
            }}
          >
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 700,
                color: "#1A1D3B",
                mb: "6px",
                textAlign: "center",
              }}
            >
              ログイン
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                color: "#9194AF",
                mb: "18px",
                textAlign: "center",
              }}
            >
              Googleアカウントでかんたんに始められます
            </Typography>

            {/* Google Sign-In Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: "100%",
                background: "white",
                border: "1.5px solid #E2E4F0",
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#1A1D3B",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: "0 1px 4px rgba(0,0,0,.08)",
              }}
            >
              {loading ? <CircularProgress size={16} /> : <GoogleIcon />}
              Googleでログイン
            </button>

            {/* Divider */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                my: "14px",
              }}
            >
              <Box sx={{ flex: 1, height: "1px", bgcolor: "#E2E4F0" }} />
              <Typography sx={{ fontSize: 10, color: "#9194AF" }}>
                安全に認証されます
              </Typography>
              <Box sx={{ flex: 1, height: "1px", bgcolor: "#E2E4F0" }} />
            </Box>

            {/* Terms */}
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 10,
                color: "#9194AF",
                lineHeight: 1.7,
              }}
            >
              ログインすることで
              <span style={{ color: "#4361EE" }}>利用規約</span>
              および
              <span style={{ color: "#4361EE" }}>プライバシーポリシー</span>
              に同意したものとみなします
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
