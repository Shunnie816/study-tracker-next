/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/vitest.setup.ts",
    include: ["**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
    server: {
      deps: {
        // MUI v9 .mjs imports react-transition-group as directory which breaks Node ESM
        inline: [
          "@mui/material",
          "@mui/icons-material",
          "react-transition-group",
        ],
      },
    },
  },
});
