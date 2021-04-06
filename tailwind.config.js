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
    extend: {
      listStyleType: {
        'lower-alpha': 'lower-alpha',
      },
      minHeight: {
        500: '500px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
