module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    indent: ["off"],
    "linebreak-style": 0,
    "global-require": 0,
    quotes: ["error", "single"],
    semi: ["error", "always"],
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: ["module"]
  },
};
