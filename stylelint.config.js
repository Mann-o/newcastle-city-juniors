module.exports = {
  extends: [
    'stylelint-config-vue'
  ],

  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'screen',
        ],
      },
    ],
  },
}
