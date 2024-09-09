/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: '#F6F5F3',
        dark: '#0A0A0A',
        primary: '#31c48d'
      }
    }
  },
  plugins: []
}