/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Open Sans', sans-serif"
      },
      colors: {
        'blue': '#0016EC'
      },
      keyframes: {
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0px 0px 0px currentColor)' },
          '50%': { filter: 'drop-shadow(0px 0px 10px currentColor)' },
        },
      },
      animation: {
        glow: 'glow 4s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
