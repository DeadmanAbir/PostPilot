/** @type {import('tailwindcss').Config} */

const sharedConfig = require("@repo/tailwind-config/tailwind.config.js");
module.exports = {
  ...sharedConfig,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
};
