module.exports = {
  presets: [
    ['@babel/preset-env', {modules: false, loose: true}],
    ['@babel/preset-react', {useBuiltIns: true}],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
  env: {
    test: {
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', {useBuiltIns: true}],
      ],
    },
  },
}
