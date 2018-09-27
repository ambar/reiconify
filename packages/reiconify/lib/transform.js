const prettier = require('./prettier')
const defaultConfig = require('./defaultConfig')
const svg2jsx = require('./svg2jsx')

const transform = async (svg, options) => {
  const {
    name,
    baseName,
    baseClassName,
    template,
    defaultProps,
    svgoPlugins,
    camelCaseProps,
  } = Object.assign({}, defaultConfig, options)
  const jsxString = await svg2jsx(svg, {svgoPlugins, camelCaseProps})
  const code = prettier(
    template({name, baseName, baseClassName, defaultProps, jsxString})
  )
  return code
}

module.exports = transform
