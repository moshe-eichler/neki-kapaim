// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'hebrew': ['Heebo', 'sans-serif'],
        'h1': ['Frank Ruhl Libre', 'Sans-serif']
      },
    },
  },
  plugins: [],
}