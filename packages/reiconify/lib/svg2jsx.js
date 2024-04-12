const svgo = require('svgo')
const hash = require('string-hash')
const JSON5 = require('json5')
// TODO: upgrade to ESM `change-case` package
const {camelCase} = require('camel-case')
const {pascalCase} = require('pascal-case')
const styleToObject = require('style-to-object')

const toCamelCase = (s) =>
  s.replace(/([-_:])([a-z])/g, (s, a, b) => b.toUpperCase())

// Custom Plugin: https://github.com/svg/svgo/issues/564#issuecomment-241468596
// 也可以用 DOMParser/cheerio 等遍历 DOM，但用 svgo 插件少一点依赖（更快）
/**
 * React v16+ 虽然可以直接使用 dash-case prop，但仍然有 warning
 * @type {import('svgo').PluginDef}
 */
const camelCaseProps = {
  name: 'camelCaseProps',
  description: 'convert attrs to camel case',
  params: {},
  fn() {
    return {
      element: {
        enter(item) {
          if (item.type === 'element') {
            item.attributes = Object.fromEntries(
              Object.entries(item.attributes).map(([name, value]) => [
                name.includes('-') ? toCamelCase(name) : name,
                value,
              ])
            )
          }
        },
      },
    }
  },
}

/**
 * `xlink:href` => `xlinkHref`
 * @type {import('svgo').PluginDef}
 */
const camelCaseNamespaceProps = {
  name: 'camelCaseNamespaceProps',
  description: 'convert namespaced attrs to camel case',
  params: {},
  fn() {
    return {
      element: {
        enter(item) {
          if (item.type === 'element') {
            item.attributes = Object.fromEntries(
              Object.entries(item.attributes).map(([name, value]) => [
                name.includes(':') ? toCamelCase(name) : name,
                value,
              ])
            )
          }
        },
      },
    }
  },
}

/**
 * @type {import('svgo').PluginDef}
 */
const reactNativeSVG = {
  name: 'reactNativeSVG',
  description: 'Convert SVG to React Native SVG',
  fn: () => {
    return {
      element: {
        enter: (item) => {
          // use namespace import
          item.name = `svg.${pascalCase(item.name)}`
        },
      },
    }
  },
}

// svgo 默认就会启用一批插件，参考：
// https://github.com/svg/svgo/issues/646
// https://github.com/BohemianCoding/svgo-compressor/blob/develop/src/defaultConfig.js
const getDefaultSvgoPlugins = ({idPrefix}) => [
  {
    name: 'preset-default',
    params: {
      overrides: {
        removeViewBox: false,
      },
    },
  },
  {
    name: 'removeXMLNS',
  },
  // NOTE: 它内置了一个 order 数组，会使结果不完全是按照字母顺序排列的
  {
    name: 'sortAttrs',
  },
  {
    name: 'prefixIds',
    params: {
      prefix: idPrefix,
      delim: '-',
    },
  },
]

const defaults = {
  svgoPlugins: [],
  camelCaseProps: false,
  styleToObject: false,
  idPrefix: '',
}

const styleToJSXStyle = (style) => {
  return JSON5.stringify(
    Object.fromEntries(
      Object.entries(styleToObject(style)).map(([k, v]) => [camelCase(k), v])
    )
  )
}

const replaceInlineStyles = (svg) =>
  svg.replace(
    /style="([^"]+)"/g,
    (match, str) => `style={${styleToJSXStyle(str)}}`
  )

const createOptimizer = (options) => {
  options = Object.assign({}, defaults, options)
  const plugins = getDefaultSvgoPlugins({idPrefix: options.idPrefix})
    .concat(options.svgoPlugins)
    .concat(options.camelCaseProps ? camelCaseProps : [])
    .concat(options.camelCaseNamespaceProps ? camelCaseNamespaceProps : [])
    .concat(options.native ? reactNativeSVG : [])

  return async (svg) => {
    const {data} = svgo.optimize(svg, {plugins})
    return options.styleToObject ? replaceInlineStyles(data) : data
  }
}

const optimize = (svg, options) => {
  const idPrefix = `id-${hash(svg)}`
  return createOptimizer(Object.assign({idPrefix}, options))(svg)
}

const svg2jsx = (svg, options) => {
  return optimize(svg, {
    styleToObject: true,
    camelCaseProps: true,
    camelCaseNamespaceProps: true,
    ...options,
  })
}

module.exports = svg2jsx
module.exports.optimize = optimize
module.exports.createOptimizer = createOptimizer
