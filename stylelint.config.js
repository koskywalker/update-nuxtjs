module.exports = {
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
  },
}
