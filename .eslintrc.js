module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
  ],

  plugins: [
  ],

  rules: {
    'comma-dangle': 0,
    'operator-linebreak': ['before'],
  },
}
