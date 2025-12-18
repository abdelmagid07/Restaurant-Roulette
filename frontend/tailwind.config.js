/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d9488', // teal-600
        'primary-dark': '#0f766e', // teal-700
        secondary: '#1e293b', // gray-800
        accent: '#fbbf24', // amber-400
      },
    },
  },
  plugins: [],
}

