/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#F2F2F2",
        primary: "#3FA6A6",
        secondary: "#36BFB1",
        accent: "#1B1D26",
        fade: "#B4D9D5",
      },
      fontFamily: {
        dancingScript: ['Dancing Script', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
