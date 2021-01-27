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
    usePrettier = false,
  } = Object.assign({}, defaultConfig, options)
  const jsxString = await svg2jsx(svg, {svgoPlugins, camelCaseProps})
  const code = template({
    name,
    baseName,
    baseClassName,
    defaultProps,
    jsxString,
  })
  return usePrettier ? require('./prettier')(code) : code
}

module.exports = transform
