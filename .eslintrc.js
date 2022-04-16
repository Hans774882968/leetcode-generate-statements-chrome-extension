module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'space-before-function-paren': [1, 'always'],
    'space-before-blocks': [1, 'always'],
    indent: [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'windows',
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'never',
    ],
    'space-infix-ops': ['error', { int32Hint: false }],
  },
}
