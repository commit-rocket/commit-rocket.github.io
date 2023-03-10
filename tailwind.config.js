const { fontFamily } = require('tailwindcss/defaultTheme')


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: [ "var(--font-open-sans)", ...fontFamily.sans]
      }
    },
  },
  plugins: [],
};
