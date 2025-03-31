import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import testingLibrary from "eslint-plugin-testing-library";
import vitest from "@vitest/eslint-plugin";
import jestDom from "eslint-plugin-jest-dom";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  { files: ["**/*.test.{js,jsx}"], ...testingLibrary.configs["flat/react"] },
  { files: ["**/*.test.{js,jsx}"], ...jestDom.configs["flat/recommended"] },
  {
    files: ["**/*.test.{js,jsx}"],
    plugins: { vitest },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "max-lines": "off",
      "max-lines-per-function": "off",
      "max-params": "off",

      "vitest/consistent-test-filename": "error",
      "vitest/consistent-test-it": [
        "error",
        { fn: "test", withinDescribe: "test" },
      ],
      "vitest/no-focused-tests": "error",
      "vitest/no-test-prefixes": "error",
      "vitest/padding-around-after-all-blocks": "error",
      "vitest/padding-around-after-each-blocks": "error",
      "vitest/padding-around-before-all-blocks": "error",
      "vitest/padding-around-before-each-blocks": "error",
      "vitest/padding-around-describe-blocks": "error",
      "vitest/padding-around-test-blocks": "error",
      "vitest/prefer-comparison-matcher": "error",
      "vitest/prefer-each": "error",
      "vitest/prefer-equality-matcher": "error",
      "vitest/prefer-expect-resolves": "error",
      "vitest/prefer-hooks-in-order": "error",
      "vitest/prefer-hooks-on-top": "error",
      "vitest/prefer-mock-promise-shorthand": "error",
      "vitest/prefer-strict-equal": "error",
      "vitest/prefer-to-be": "error",
      "vitest/prefer-to-be-object": "error",
      "vitest/prefer-to-contain": "error",
      "vitest/prefer-to-have-length": "error",
      "vitest/prefer-todo": "error",
      "vitest/prefer-vi-mocked": "error",
      "vitest/valid-expect-in-promise": "error",
    },
  },
];
