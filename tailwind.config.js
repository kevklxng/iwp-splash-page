/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        stone: {
          850: '#1c1917',
          950: '#0c0a09',
        },
        warm: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#e8dfd2',
        },
      },
    },
  },
  plugins: [],
}
