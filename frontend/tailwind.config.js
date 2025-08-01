// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', // <--- ADD THIS LINE
  theme: {
    extend: {
      colors: {
        'brand-blue': '#4A00E0',
        'brand-green': '#8E2DE2',
        'dark-bg': '#121212',
        'dark-surface': '#1E1E1E',
        'dark-text': '#E0E0E0',
        'light-gray': '#F7F7F7',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
        mono: ['monospace'],
      },
animation: {
        scroll: 'scroll 20s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow-sm': { textShadow: theme('textShadow.sm', '0 1px 2px var(--tw-shadow-color)') },
        '.text-shadow-md': { textShadow: theme('textShadow.md', '0 2px 4px var(--tw-shadow-color)') },
        '.text-shadow-lg': { textShadow: theme('textShadow.lg', '0 4px 8px var(--tw-shadow-color)') },
      }
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}