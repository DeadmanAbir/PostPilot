import { defineConfig } from "eslint/config";
import reactConfig from "@repo/eslint-config/react";

export default defineConfig([
  ...reactConfig,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: ["dist/**", "node_modules/**"],
  },
]);
