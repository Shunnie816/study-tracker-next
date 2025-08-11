const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@import "@/assets/styles/breakpoint.scss";`,
    includePaths: [path.join(__dirname, "src")],
  },
};

module.exports = nextConfig;
