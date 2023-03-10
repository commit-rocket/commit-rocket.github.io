const { fontFamily } = require('tailwindcss/defaultTheme');


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF5C00",
          light: "#FF792E",
          dark: "#DB5103",
          contrast: "#FFF"
        },
        secondary: {
          DEFAULT: "#E83227",
          light: "#F44338",
          dark: "#B01D14",
          contrast: "#FFF"
        },
        fill: {
          DEFAULT: "#FFDFC1",
          contrast: "#282828"
        }
      },
      fontFamily: {
        openSans: ["var(--font-open-sans)", ...fontFamily.sans]
      }
    },
  },
  plugins: [],
};
