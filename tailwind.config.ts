/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Texte normal
        sans: ['Inter', 'Roboto', 'ui-sans-serif', 'system-ui'],
        // Titres
        heading: ['Poppins', 'Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#4f46e5', // Indigo 600
        secondary: '#f97316', // Orange 500
      },
    },
  },
  plugins: [],
};
