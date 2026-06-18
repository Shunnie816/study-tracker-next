import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Layout } from "@/components/Templates/Layout";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "@/assets/styles/global.scss";
import "@/assets/styles/variable.scss";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: false,
});

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
    <html lang="ja" className={notoSansJP.variable}>
      <body>
        <AppRouterCacheProvider>
          <Layout>{children}</Layout>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
