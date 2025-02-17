import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./components/**/*.{js,ts,jsx,tsx}", "./index.tsx"],
  splitting: false,
  sourcemap: true,
  clean: true,
});
