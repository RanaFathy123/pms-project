module.exports = {
  root: true,
  rules: {
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": 0,
    "react/tsx-uses-react": "off",
    "react/react-in-tsx-scope": "off",
  },
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
