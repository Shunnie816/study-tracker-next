/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // describe, it, expect をグローバルで使う
    environment: "jsdom", // ブラウザのDOM環境をエミュレート
    setupFiles: "./src/vitest.setup.ts", // 初期設定ファイルを指定
    include: ["**/*.test.{ts,tsx}"], // テストファイルのパターン指定
  },
});
