/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0F14',
        surface: '#141F28',
        primary: '#DDE3ED',
        accent: '#1E64BA',
        'accent-light': '#4D8FD6',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        drama: ['Montserrat', 'sans-serif'], // Using Montserrat for drama too, as requested
      },
    },
  },
  plugins: [],
}
