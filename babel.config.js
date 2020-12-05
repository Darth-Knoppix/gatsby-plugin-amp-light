module.exports = {
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ],
  plugins: [
    "@babel/plugin-syntax-jsx",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-runtime",
  ],
};
