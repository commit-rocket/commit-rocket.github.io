const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/utils/**/*.{ts,tsx}",
    "./src/assets/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": 'radial-gradient(circle closest-side, var(--tw-gradient-stops))'
      },
      colors: {
        primary: {
          DEFAULT: "#f2600c",
          300: "#FCCAA6",
          light: "#FF8D4C",
          dark: "#bf4701",
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
          contrast: {
            light: "#474747",
            DEFAULT: "#282828",
            dark: "#191919"
          }
        }
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    plugin(({ addVariant, addComponents }) => {
      addVariant("is", ":is(&)");
      addVariant("where", ":where(&)");
      addComponents({
        ".image-dots": {
          "background-image": "radial-gradient(var(--tw-gradient-from), transparent 1.5px, transparent 1.5px)",
          "background-size": "1.1rem 1.1rem",
          "background-position": "50% 50%"
        }
      });

    })
  ],
};
