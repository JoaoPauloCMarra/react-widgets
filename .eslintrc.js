module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'preact',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    preact: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/jsx-key': 0,
    'no-unused-vars': 0,
  },
};
