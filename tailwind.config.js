const plugin = require("tailwindcss/plugin");
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/utils/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle closest-side, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: "#f2600c",
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
          DEFAULT: "#FFE4CC",
          contrast: "#282828"
        }
      },
      fontFamily: {
        openSans: ["var(--font-open-sans)", ...fontFamily.sans]
      }
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("is", ":is(&)");
      addVariant("where", ":where(&)");
    })
  ],
};
