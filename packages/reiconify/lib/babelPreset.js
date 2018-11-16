module.exports = (api, envOptions) => {
  api.assertVersion(7)

  return {
    presets: [
      ['@babel/preset-env', envOptions],
      ['@babel/preset-react', {useBuiltIns: true}],
    ],
    plugins: [['@babel/plugin-proposal-class-properties', {loose: true}]],
    env: {
      test: {
        presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
      },
    },
  }
}
