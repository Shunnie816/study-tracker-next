/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

const path = require("path");

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const sassRule = {
        test: /\.module\.(scss|sass)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                globalModulePaths: [
                  path.resolve(__dirname, "src/assets/styles/variable.scss"),
                ],
              },
            },
          },
          "sass-loader",
        ],
      };

      config.module.rules.push(sassRule);
    }

    return config;
  },
};
