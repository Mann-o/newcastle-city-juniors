const colors = require('tailwindcss/colors')
const flatMap = require('lodash/flatMap')
const omit = require('lodash/omit')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],

  theme: {
    colors: {
      // ...colors,
      gold: colors.amber['400'],
      black: colors.black,
      blackish: '#222',
      white: colors.white,
      'grey-200': colors.gray['200'],
      'grey-400': colors.gray['400'],
      'grey-600': colors.gray['600'],
      'grey-700': colors.gray['700'],
      'grey-800': colors.gray['800'],
      'grey-900': colors.gray['900'],
      danger: '#ff0000',
      success: '#155724',
      'success-bg': '#d4edda',
      info: '#004085',
      warning: '#856404',
    },
    fontFamily: {
      sans: [
        'sans-serif',
      ],
      serif: [
        'TimesNewRoman',
        'Times',
        'Times New Roman',
        'serif',
      ],
    },
    extend: {
      borderRadius: {
        half: '50%',
      },
      fontFamily: {
        poppins: [
          'Poppins',
          'sans-serif',
        ],
      },
      height: {
        '10v': '10vh',
        '20v': '20vh',
        '30v': '30vh',
        '40v': '40vh',
        '50v': '50vh',
        '60v': '60vh',
        '70v': '70vh',
        '80v': '80vh',
        '90v': '90vh',
        '100v': '100vh',
      },
      lineHeight: {
        stripe: '16.8px',
      },
      listStyleType: {
        'lower-alpha': 'lower-alpha',
      },
      minHeight: {
        500: '500px',
      },
      maxHeight: {
        250: '250px',
      },
      zIndex: {
        max: 9999,
      },
    },
  },

  variants: {
    margin: ({ after }) => after(['first-of-type']),
    extend: {},
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    ({ addUtilities, e, theme, variants }) => {
      const colors = flattenColorPalette(theme('borderColor'))

      const utilities = flatMap(omit(colors, 'default'), (value, modifier) => ({
        [`.${e(`border-t-${modifier}`)}`]: { borderTopColor: `${value}` },
        [`.${e(`border-r-${modifier}`)}`]: { borderRightColor: `${value}` },
        [`.${e(`border-b-${modifier}`)}`]: { borderBottomColor: `${value}` },
        [`.${e(`border-l-${modifier}`)}`]: { borderLeftColor: `${value}` },
      }))

      addUtilities(utilities, variants('borderColor'))
    },
    ({ addVariant, e }) => {
      addVariant('first-of-type', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.${e(`first-of-type${separator}${className}`)}:first-of-type`)
      })
    },
  ],
}
