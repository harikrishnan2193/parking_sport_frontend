/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'serif'],
        roboto: ['Roboto', 'serif'],
      },
      spacing: {
        'xl-padding': '6rem',
        'lg-padding': '4rem',
      },
    },
  },
  plugins: [],
}