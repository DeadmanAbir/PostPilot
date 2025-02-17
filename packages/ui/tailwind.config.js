/** @type {import('tailwindcss').Config} */
const sharedConfig = require("@repo/tailwind-config/tailwind.config.js");
module.exports = {
  ...sharedConfig,
  content: ["./components/**/*.{js,ts,jsx,tsx}"],
};
