module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    es6: true,
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'airbnb-base'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
  },
};
