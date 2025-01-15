/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        division: {
          orange: '#FF6B2B',
          red: '#E31E24',
          yellow: '#FFD700',
          blue: '#00A8E8',
          dark: {
            DEFAULT: '#121212',
            lighter: '#1E1E1E',
            light: '#2A2A2A'
          },
          gray: {
            dark: '#333333',
            DEFAULT: '#666666',
            light: '#999999'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif']
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.25)',
        'glow': '0 0 15px -3px rgb(255 107 43 / 0.4)'
      }
    },
  },
  plugins: [],
}
