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
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
        mono: ['monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'pop-in': 'popIn 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle-slow': 'wiggle 10s ease-in-out infinite',
        'spin-reverse': 'spin-reverse 5s linear infinite',
        'dropdown-fade-in': 'dropdownFadeIn 0.2s ease-out forwards',
        // 'record-pulse': 'recordPulse 1.5s infinite', // Remove if not used in current SpeakPage
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -10px) rotate(-5deg)' },
          '50%': { transform: 'translate(-10px, 10px) rotate(5deg)' },
          '75%': { transform: 'translate(5px, -5px) rotate(-2deg)' },
        },
        'spin-reverse': {
            from: { transform: 'rotate(360deg)' },
            to: { transform: 'rotate(0deg)' },
        },
        dropdownFadeIn: {
            '0%': { opacity: '0', transform: 'scale(0.95) translateY(-5px)' },
            '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        // Ensure recordPulse is here if needed for SpeakPage, otherwise remove
        // recordPulse: {
        //   '0%, 100%': { boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.7)', transform: 'scale(1)' },
        //   '50%': { boxShadow: '0 0 0 20px rgba(99, 102, 241, 0)', transform: 'scale(1.05)' },
        // },
      },
      textShadow: {
        'sm': '0 1px 2px var(--tw-shadow-color)',
        'md': '0 2px 4px var(--tw-shadow-color)',
        'lg': '0 4px 8px var(--tw-shadow-color)',
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