module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "6",
        },
      },
    ],
    ["@babel/preset-typescript"],
  ],

  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
  ],

  ignore: ["./node_modules", "./tests", "**/*.spec.js"],
};
