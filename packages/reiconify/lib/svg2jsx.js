const SVGO = require('svgo')

const toCamelCase = s =>
  s.replace(/([-_])([a-z])/g, (s, a, b) => b.toUpperCase())

// Custom Plugin: https://github.com/svg/svgo/issues/564#issuecomment-241468596
// 也可以用 DOMParser/cheerio 等遍历 DOM，但用 svgo 插件少一点依赖（更快）
// 并且 React v16+ 不再需要这个处理
const camelCaseProps = {
  camelCaseProps: {
    type: 'perItem',
    description: 'convert attrs to camelCase',
    params: {},
    fn(item) {
      if (item.isElem()) {
        item.eachAttr(attr => {
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

// svgo 默认就会启用一批插件，参考：
// https://github.com/svg/svgo/issues/646
// https://github.com/BohemianCoding/svgo-compressor/blob/development/src/plugin.js#L130
const extraSvgoPlugins = [
  {removeDesc: {removeAny: true}},
  {removeXMLNS: true},
  {sortAttrs: true},
]

const defaults = {
  svgoPlugins: [],
  camelCaseProps: false,
}

const createSvg2jsx = options => {
  options = Object.assign({}, defaults, options)
  const plugins = extraSvgoPlugins
    .concat(options.svgoPlugins)
    .concat(options.camelCaseProps ? camelCaseProps : [])
  const svgo = new SVGO({plugins})

  return svg =>
    // 官方已支持 Promise API，但还未发布
    new Promise((resolve, reject) =>
      svgo.optimize(
        svg,
        ({error, data}) => (error ? reject(error) : resolve(data))
      )
    )
}

const svg2jsx = (svg, options) => createSvg2jsx(options)(svg)

module.exports = svg2jsx
module.exports.createSvg2jsx = createSvg2jsx
