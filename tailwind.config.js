/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f47019',
          600: '#e05e09',
          700: '#c44700',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        }
      }
    },
  },
  plugins: [],
}
