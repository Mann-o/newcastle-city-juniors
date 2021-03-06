import { NuxtOptionsBuild } from '@nuxt/types/config/build'

export const build: NuxtOptionsBuild = {
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  analyze: (process.env.ANALYZE === 'true')
    ? {
        analyzerMode: 'static',
        generateStatsFile: true,
        statsFilename: 'webpack-stats.json',
      }
    : false,

  babel: {
    plugins: [
      // ['@babel/plugin-proposal-private-methods', {
      //   loose: true,
      // }],
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
  },

  transpile: [
    /^vue2-google-maps($|\/)/,
    'vee-validate/dist/rules',
  ],
}
