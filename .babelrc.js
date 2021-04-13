module.exports = {
  presets: ['@babel/env', ['@babel/typescript', { jsxPragma: 'h' }]],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'h',
        pragmaFrag: 'Fragment',
      },
    ],
    ['@babel/plugin-proposal-class-properties'],
  ],
};
