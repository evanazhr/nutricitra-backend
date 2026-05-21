import globals from "globals";
import js from "@eslint/js";

export default [
  {
    ignores: ["prisma/**/*", "prisma/*", "generated/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: { ...globals.node }
    },
    rules: {
      semi: ["error", "always"],
      indent: ["error", 2],
      "prefer-const": "error",
      "object-curly-spacing": ["error", "always"],
      "brace-style": ["error", "1tbs", { "allowSingleLine": false }],
      "no-multi-spaces": "error",
      "space-before-blocks": ["error", "always"],
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    },
  },
];
