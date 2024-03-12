import { colors } from './src/renderer/theme';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: "#root",
};
