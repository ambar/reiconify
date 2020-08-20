const babel = require('@babel/core')

const babelTransform = (code, envOptions, babelOptions) => {
  return babel.transform(code, {
    babelrc: false,
    configFile: false,
    presets: [[require('./babelPreset'), envOptions]],
    ...babelOptions,
  }).code
}

module.exports = babelTransform
