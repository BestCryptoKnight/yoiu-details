// https://medium.com/@NiGhTTraX/making-typescript-monorepos-play-nice-with-other-tools-a8d197fdc680

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require("webpack");

module.exports = (config) => {
  // Remove the ModuleScopePlugin which throws when we try
  // to import something outside of src/.
  config.resolve.plugins.pop();

  config.resolve.fallback = {
...config.resolve.fallback,
    process: require.resolve('process/browser'),
    zlib: require.resolve('browserify-zlib'),
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util'),
    buffer: require.resolve('buffer'),
    asset: require.resolve('assert'),
    crypto: require.resolve("crypto-browserify"),
    os: require.resolve("os-browserify/browser"),
    https: require.resolve("https-browserify"),
    http: require.resolve("stream-http"),
    path: require.resolve("path-browserify"),
  };
  
  // Resolve the path aliases.
  config.resolve.plugins.push(new TsconfigPathsPlugin());

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  // Let Babel compile outside of src/.
  const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
  const tsRule = oneOfRule.oneOf.find((rule) =>
    rule.test.toString().includes("ts|tsx")
  );
  tsRule.include = undefined;
  tsRule.exclude = /node_modules/;

  return config;
};
