module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-new': 'off',
    'no-useless-return': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 1,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/no-v-html': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'nuxt/no-cjs-in-config': 'off',
  },
}
