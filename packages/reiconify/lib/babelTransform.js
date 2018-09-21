const babel = require('@babel/core')

const babelConfigs = {
  cjs: {
    presets: [
      ['@babel/preset-env', {modules: 'commonjs', loose: true}],
      ['@babel/preset-react', {useBuiltIns: true}],
    ],
  },
  es: {
    presets: [
      ['@babel/preset-env', {modules: false, loose: true}],
      ['@babel/preset-react', {useBuiltIns: true}],
    ],
  },
}

const babelTransform = (code, env) => {
  return babel.transform(code, babelConfigs[env]).code
}

module.exports = babelTransform
