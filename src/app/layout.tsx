import { Layout } from "@/components/Templates/Layout";
import type { Metadata } from "next";
import "../assets/styles/global.scss";
import "../assets/styles/variable.scss";

export const metadata: Metadata = {
  title: "Study Tracker",
  description: "This is an app to track your study time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
