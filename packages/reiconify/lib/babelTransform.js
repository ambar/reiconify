const babel = require('@babel/core')

const babelTransform = (code, envOptions) => {
  return babel.transform(code, {
    presets: [[require('./babelPreset'), envOptions]],
  }).code
}

module.exports = babelTransform
