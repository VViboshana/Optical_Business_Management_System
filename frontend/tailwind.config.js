/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors:{
        'primary':"#D76A03",
        'matte-orange-border': '#D76A03',
      },

      gridTemplateColumns:{
        'auto':'repeat(auto-fill,minmax(200px,1fr))'
      }

    },
  },
  plugins: [],
}