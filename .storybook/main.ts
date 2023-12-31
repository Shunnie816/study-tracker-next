import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

// webpackFinalがundefinedでないことを確認してからエイリアスを追加する
if (config?.webpackFinal) {
  config.webpackFinal = async (webpackConfig) => {
    if (webpackConfig.resolve && webpackConfig.resolve.alias) {
      webpackConfig.resolve.alias["@"] = path.resolve(__dirname, "../src");
    }
    return webpackConfig;
  };
}

export default config;
