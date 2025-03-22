/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    },

    fontsFamily: {
      'primary': ["Montserrat", "sans-serif"],
      'secondary': ["Nunito Sans", "sans-serif"],
    }
  },
  plugins: [],
}

