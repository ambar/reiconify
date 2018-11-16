module.exports = {
  presets: [[require('./lib/babelPreset')]],
  env: {
    test: {
      presets: [[require('./lib/babelPreset'), {targets: {node: 'current'}}]],
    },
  },
}
