const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["var(--cardo-font)", ...fontFamily.sans],
        primary: ["var(--manrope-font)", ...fontFamily.sans],
        serif: ["var(--cardo-font)", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
