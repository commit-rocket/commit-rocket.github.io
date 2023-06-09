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
      colors: {
        /** Commit Rocket colors */
        cr: {
          primary: {
            DEFAULT: "#f45a07",
            light: "#f9794a",
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
    plugin(({ addComponents, addUtilities }) => {
      addComponents({
        ".image-dots": {
          "background-image": "radial-gradient(var(--tw-gradient-from), transparent 1.5px, transparent 1.5px)",
          "background-size": "1.1rem 1.1rem",
          "background-position": "50% 50%"
        },
        ".image-star": {
          "background-image": "url('/images/textures/star.svg')",
          "background-size": "2rem 2rem",
          "background-position": "50% 50%"
        },
        ".backdrop-glass": {
          "--tw-backdrop-blur": "blur(1.25px);",
          "--tw-backdrop-saturate": "saturate(180%)",
          "-webkit-backdrop-filter": "var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);",
          "backdrop-filter": "var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);"
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
