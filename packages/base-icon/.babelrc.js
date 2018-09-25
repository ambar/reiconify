module.exports = {
  presets: [
    ['@babel/preset-env', {modules: false, loose: true}],
    ['@babel/preset-react', {useBuiltIns: true}],
  ],
  env: {
    test: {
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', {useBuiltIns: true}],
      ],
    },
  },
}
