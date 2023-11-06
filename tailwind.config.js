/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Open Sans', sans-serif",
      },
      colors: {
        'blue': '#0016ec',
        'dark-white': '#e4e6ef',
        'off-white': '#f0f1fa',
        'green': '#c1ff00',
      },
      keyframes: {
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0px 0px 0px currentColor)' },
          '50%': { filter: 'drop-shadow(0px 0px 10px currentColor)' },
        },
        '3d-rotate': {
          from: {
            transform: 'perspective(1000px) rotateY(360deg) rotateX(15deg) translateY(-40px)',
          },
          to: {
            transform: 'perspective(1000px) rotateY(0deg) rotateX(15deg) translateY(-40px)',
          },
        },
      },
      animation: {
        glow: 'glow 4s ease-in-out infinite',
        '3d-rotate': '3d-rotate 10s linear infinite'
      },
    },
  },
  plugins: [],
};
