const SVGO = require('svgo')
const hash = require('string-hash')
const JSON5 = require('json5')
const mapKeys = require('lodash/mapKeys')
const camelCase = require('lodash/camelCase')
const styleToObject = require('style-to-object')

const toCamelCase = (s) =>
  s.replace(/([-_:])([a-z])/g, (s, a, b) => b.toUpperCase())

// Custom Plugin: https://github.com/svg/svgo/issues/564#issuecomment-241468596
// 也可以用 DOMParser/cheerio 等遍历 DOM，但用 svgo 插件少一点依赖（更快）
// 并且 React v16+ 不再需要这个处理
const camelCaseProps = {
  camelCaseProps: {
    type: 'perItem',
    description: 'convert attrs to camel case',
    params: {},
    fn(item) {
      if (item.isElem()) {
        item.eachAttr((attr) => {
          if (attr.name.includes('-')) {
            const newAttr = Object.assign({}, attr, {
              name: toCamelCase(attr.name),
            })
            item.attrs[newAttr.name] = newAttr
            item.removeAttr(attr.name)
          }
        })
      }
    },
  },
}

// `xlink:href` => `xlinkHref`
const camelCaseNamespacedProps = {
  camelCaseProps: {
    type: 'perItem',
    description: 'convert namespaced attrs to camel case',
    params: {},
    fn(item) {
      if (item.isElem()) {
        item.eachAttr((attr) => {
          if (attr.name.includes(':')) {
            const newAttr = Object.assign({}, attr, {
              name: toCamelCase(attr.name),
            })
            item.attrs[newAttr.name] = newAttr
            item.removeAttr(attr.name)
          }
        })
      }
    },
  },
}

// svgo 默认就会启用一批插件，参考：
// https://github.com/svg/svgo/issues/646
// https://github.com/BohemianCoding/svgo-compressor/blob/develop/src/defaultConfig.js
const getDefaultSvgoPlugins = ({idPrefix}) => [
  {removeViewBox: false},
  {removeDesc: {removeAny: true}},
  {removeXMLNS: true},
  {sortAttrs: true},
  {cleanupIDs: {prefix: idPrefix}},
  camelCaseNamespacedProps,
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
  const svgo = new SVGO({plugins})

  return (svg) =>
    svgo
      .optimize(svg)
      .then(({data}) =>
        options.styleToObject ? replaceInlineStyles(data) : data
      )
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
