/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary' : '#EC3724',
        'secondary' : '#0D0842',
        'blackBG':'#F3F3F3',
        'Favorite': '#FF5841'
      },
      fontFamily:{
        'primary':["Montserrat", "sans-serif"],
        'secondary':["Nunito sans", "sans-serif"]

      }
    },
  },
  plugins: [],
}

