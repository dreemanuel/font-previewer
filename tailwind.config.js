/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'near-black': '#1a1a1a',
        'near-white': '#f5f5f5',
      },
    },
  },
  plugins: [],
}
