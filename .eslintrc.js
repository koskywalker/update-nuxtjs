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
    'plugin:vue/essential',
    'prettier',
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'semi': [2, 'never'],
    // 'vue/max-attributes-per-line': ['error', {
    //   singleline: 1,
    //   multiline: {
    //     max: 1,
    //     allowFirstLine: false,
    //   },
    // }],
  },
}
