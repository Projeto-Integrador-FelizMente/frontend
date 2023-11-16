/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}","./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default {
  ...tailwindConfig,
   darkMode: "class",
  
}
