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
  const isE2E = process.env.NEXT_PUBLIC_E2E_MODE === "true";
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isE2E || loading) return;
    if (!user && pathname !== "/login") {
      router.replace("/login");
    }
    if (user && pathname === "/login") {
      router.replace("/");
    }
  }, [isE2E, user, loading, pathname, router]);

  if (isE2E) {
    return (
      <>
        <Header />
        <div className={styles.container}>{children}</div>
        <Footer />
      </>
    );
  }

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
