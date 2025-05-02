import { defineConfig } from "eslint/config";
import reactConfig from "@repo/eslint-config/react";

export default defineConfig([
  ...reactConfig,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react-hooks/rules-of-hooks": "off",
    },
  },
]);
