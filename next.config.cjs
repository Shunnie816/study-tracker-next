const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // shunniehub.comのサブドメインにするため、ルートを/study-trackerに設定
  basePath: "/study-tracker",
  sassOptions: {
    additionalData: `@import "@/assets/styles/breakpoint.scss";`,
    includePaths: [path.join(__dirname, "src")],
  },
};

module.exports = nextConfig;
