const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/utils/**/*.{ts,tsx}",
    "./src/assets/state/articles/*.jsx",
    "./src/assets/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": 'radial-gradient(circle closest-side, var(--tw-gradient-stops))'
      },
      colors: {
        /** Commit Rocket colors */
        cr: {
          primary: {
            DEFAULT: "#ea580c",
            light: "#fb923c",
            dark: "#92400e",
            contrast: "#FFF"
          },
          fill: {
            DEFAULT: "#18181b",
            light: "#52525b",
            dark: "#18181b",
            contrast: {
              light: "#fff",
              DEFAULT: "#f2f2f2",
              dark: "#e5e5e5"
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    plugin(({ addVariant, addComponents, addUtilities }) => {
      addVariant("is", ":is(&)");
      addVariant("where", ":where(&)");
      addComponents({
        ".image-dots": {
          "background-image": "radial-gradient(var(--tw-gradient-from), transparent 1.5px, transparent 1.5px)",
          "background-size": "1.1rem 1.1rem",
          "background-position": "50% 50%"
        }
      });
      addUtilities({
        ".rotate-30": {
          "--tw-rotate": "30deg",
          "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"
        }
      });
    })
  ],
};
