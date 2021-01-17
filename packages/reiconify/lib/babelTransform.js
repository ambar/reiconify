const babel = require('@babel/core')

const babelTransform = async (code, envOptions, babelOptions) => {
  const result = await babel.transformAsync(code, {
    babelrc: false,
    configFile: false,
    presets: [[require('./babelPreset'), envOptions]],
    ...babelOptions,
  })
  return result.code
}

module.exports = babelTransform
