module.exports = {
  presets: [
    ['@babel/preset-env', {modules: false, loose: true}],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-proposal-object-rest-spread',
      {loose: true, useBuiltIns: true},
    ],
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
}
