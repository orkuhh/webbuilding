/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'division-red': '#E31E24',
        'division-dark': '#1A1A1A',
        'division-light': '#F5F5F5'
      }
    },
  },
  plugins: [],
}
