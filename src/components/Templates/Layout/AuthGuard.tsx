"use client";
import { CircularProgress, Box } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Footer } from "@/components/Templates/Footer";
import { Header } from "@/components/Templates/Header";
import { useAuth } from "@/libs/hooks/useAuth";
import styles from "./index.module.scss";

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

  if (pathname === "/login") {
    if (user) return null;
    return <>{children}</>;
  }

  if (!user) return null;

  return (
    <>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
}
