/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#e6e6e6ff',
        'primary': '#1434c5ff',
      },
    },
  },
  plugins: [],
}