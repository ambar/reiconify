const defaultConfig = require('./defaultConfig')
const svg2jsx = require('./svg2jsx')
const esTransform = require('./esTransform')

/**
 * Convert SVG to JS
 * @param {string} svg
 * @param {import('./types').Options} options
 * @returns {Promise<string>}
 */
const transform = async (svg, options) => {
  const {
    name,
    baseName,
    baseClassName,
    template,
    defaultProps,
    svgoPlugins,
    camelCaseProps,
    native = false,
    usePrettier = false,
    format = 'esm',
    jsx = 'react',
  } = Object.assign({}, defaultConfig, options)
  const jsxString = await svg2jsx(svg, {svgoPlugins, native, camelCaseProps})
  let code = template({
    name,
    baseName,
    baseClassName,
    defaultProps,
    jsxString,
    native,
  })
  // TODO: upgrade esbuild to support jsx automatic runtime
  if (jsx !== 'preserve') {
    code = await esTransform(code, {format})
  }
  return usePrettier ? require('./prettier')(code) : code
}

module.exports = transform
