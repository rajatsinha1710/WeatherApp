/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx'],
  content: [],
  theme: {
    extend: {},
    backgroundImage : {
      'sun-set' : "url(./assets/sunset.jpg)"
    }
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

