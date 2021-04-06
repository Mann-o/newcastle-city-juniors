const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      gold: colors.amber['400'],
      black: colors.black,
      blackish: '#222',
      white: colors.white,
      grey: colors.gray['400'],
      'dark-grey': colors.gray['600'],
    },
    fontFamily: {
      sans: [
        'Poppins',
        'sans-serif',
      ],
    },
    minHeight: {
      0: '0',
      '1/4': '25vh',
      '1/2': '50vh',
      '3/4': '75vh',
      full: '100vh',
      500: '500px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
