/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#04070A',
        surface: '#141F28',
        primary: '#E2E8F0',
        secondary: '#94A3B8',
        accent: '#1E64BA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      lineHeight: {
        'tight-compressed': '1.15',
        'relaxed-body': '1.65',
      }
    },
  },
  plugins: [],
}
