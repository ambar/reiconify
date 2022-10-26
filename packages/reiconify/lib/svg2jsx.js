const svgo = require('svgo')
const hash = require('string-hash')
const JSON5 = require('json5')
const mapKeys = require('lodash/mapKeys')
const camelCase = require('lodash/camelCase')
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
            for (const [name, value] of Object.entries(item.attributes)) {
              if (name.includes('-')) {
                const newName = toCamelCase(name)
                item.attributes[newName] = value
                delete item.attributes[name]
              }
            }
          }
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
  // 除了移除 svg[xmlns=]，v3 还移除了 [xlink:href]
  {
    name: 'removeXMLNS',
  },
  {
    name: 'sortAttrs',
  },
  {
    name: 'prefixIds',
    params: {
      prefix: idPrefix,
    },
  },
  // {
  //   name: 'cleanupIds',
  //   params: {
  //     prefix: idPrefix,
  //   },
  // },
  // {removeViewBox: false},
  // {removeDesc: {removeAny: true}},
  // {removeXMLNS: true},
  // {sortAttrs: true},
  // {cleanupIDs: {prefix: idPrefix}},
]

const defaults = {
  svgoPlugins: [],
  camelCaseProps: false,
  styleToObject: false,
  idPrefix: '',
}

const styleToJSXStyle = (style) => {
  return JSON5.stringify(mapKeys(styleToObject(style), (v, k) => camelCase(k)))
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

  return (svg) =>
    new Promise((resolve) => {
      const {data} = svgo.optimize(svg, {plugins})
      resolve(options.styleToObject ? replaceInlineStyles(data) : data)
    })
}

const optimize = (svg, options) => {
  const idPrefix = `id-${hash(svg)}-`
  return createOptimizer(Object.assign({idPrefix}, options))(svg)
}

const svg2jsx = (svg, options) => {
  return optimize(svg, {styleToObject: true, camelCaseProps: true, ...options})
}

module.exports = svg2jsx
module.exports.optimize = optimize
module.exports.createOptimizer = createOptimizer
