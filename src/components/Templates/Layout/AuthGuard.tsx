"use client";
import { CircularProgress, Box } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "@/libs/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user && pathname !== "/login") {
      router.replace("/login");
    }
    if (user && pathname === "/login") {
      router.replace("/");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user && pathname !== "/login") return null;

  return <>{children}</>;
}
