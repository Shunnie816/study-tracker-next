import { LoginPage } from "@/components/Pages/Login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/login" },
};

export default function Login() {
  return <LoginPage />;
}
