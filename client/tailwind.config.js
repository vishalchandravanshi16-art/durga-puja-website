/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        devotional: {
          red: '#990000',
          darkRed: '#660000',
          gold: '#D4AF37',
          yellow: '#FFC107',
          saffron: '#FF9933',
          cream: '#FFFDD0'
        }
      }
    },
  },
  plugins: [],
}