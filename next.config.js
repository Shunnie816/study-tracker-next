import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // shunniehub.comのサブドメインにするため、ルートを/study-trackerに設定
  basePath: "/study-tracker",
  sassOptions: {
    additionalData: `@import "@/assets/styles/breakpoint.scss";`,
    includePaths: [path.join(process.cwd(), "src")],
  },
};

export default nextConfig;
