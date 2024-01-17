import type { Preview } from "@storybook/react";
/** variable.scssの値を読み込むためにimportが必要 */
import "../src/assets/styles/variable.scss";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
