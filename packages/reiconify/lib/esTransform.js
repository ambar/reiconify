const {transform} = require('esbuild')

const esTransform = async (code, options) => {
  const result = await transform(code, {
    target: 'es2018',
    loader: 'jsx',
    ...options,
  })
  return result.code
}

module.exports = esTransform
