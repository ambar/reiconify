const defaultConfig = require('./defaultConfig')
const svg2jsx = require('./svg2jsx')
const esTransform = require('./esTransform')

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
    format = null,
  } = Object.assign({}, defaultConfig, options)
  const jsxString = await svg2jsx(svg, {svgoPlugins, camelCaseProps})
  let code = template({
    name,
    baseName,
    baseClassName,
    defaultProps,
    jsxString,
  })
  if (format) {
    code = await esTransform(code, {format})
  }
  return usePrettier ? require('./prettier')(code) : code
}

module.exports = transform
