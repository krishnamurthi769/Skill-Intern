/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{tsx,ts,jsx,js}"
  ],
  theme: {
    extend: {
      colors: {
        "gradevo-navy": "#05051F",
        "gradevo-white": "#ffffff",
        "gradevo-red": "#FF003D",
        "gradevo-orange": "#FF3B2E",
        "gradevo-blue": "#4A6CFF"
      },
      fontFamily: {
        sans: ['"Helvetica Now"', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['"Helvetica Now"', 'Helvetica', 'Arial', 'sans-serif'],
      }
    }
  },
  plugins: [],
};
