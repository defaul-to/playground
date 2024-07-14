/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pk: ['Planet Kosmos'],
      },
      colors: {
        primary: '#000',
        secondary: '#ececec',
        contrast: '#D7ABC5',
      },
    },
  },
  plugins: [],
}