const pascalCase = require('pascal-case')
const prettier = require('./prettier')

// https://github.com/mapbox/svg-react-transformer/blob/master/lib/templates/default.js
const template = data => {
  let propTypesRequire = ''
  let propTypes = ''
  if (data.propTypes !== undefined) {
    propTypesRequire = `\nimport PropTypes from 'prop-types'`
    propTypes = `${data.name}.propTypes = ${data.propTypes}`
  }
  const jsxSvgWithProps = data.jsxSvg
    .replace(/<svg([\s\S]*?)>/, (match, group) => `<Icon${group} {...props}>`)
    .replace(/<\/svg>$/, '</Icon>')

  return prettier(`
    import React from 'react'${propTypesRequire}
    import Icon from './Icon'

    const ${data.name} = props => ${jsxSvgWithProps}

    ${propTypes}

    ${data.name}.defaultProps = ${JSON.stringify(
    Object.assign(
      {
        name: data.name,
      },
      data.defaultProps
    )
  )}

    export default ${data.name}
  `)
}

const baseTemplate = data => {
  // deserialize function values
  const stringify = obj =>
    JSON.stringify(
      obj,
      (k, v) => (typeof v === 'function' ? `λ${v}λ` : v)
    ).replace(/("λ)((.|\n)*?)(λ")/g, '$2')

  const reduceProps = `const reduceProps = (props, reducers) =>
    Object.keys(reducers).reduce((o, k) => {
      if (o[k]) {
        const reducer = reducers[k]
        const value = typeof reducer === 'function' ? reducer(o) : reducer
        delete o[k]
        return {
          ...o,
          ...value,
          ...(value &&
            value.style && {
              style: {
                ...o.style,
                ...value.style,
              },
            }),
        }
      }
      return o
    }, {...props})
  `

  return prettier(`
    import React from 'react'

    ${data.baseMapProps ? reduceProps : ''}

    const Icon = (props) => {
      const {
        name,
        className,
        defaultClassName,
        size,
        ...rest
      } = ${data.baseMapProps ? `reduceProps(props, Icon.mapProps)` : 'props'}

      return (
        <svg
          className={\`\${defaultClassName} \${defaultClassName}--\${name}\${className
            ? \` \${className}\`
            : ''}\`}
          {...rest}
          {...size && {width: size, height: size}}
        />
      )
    }

    Icon.defaultProps = ${JSON.stringify(data.baseDefaultProps)}

    ${data.baseMapProps
      ? `Icon.mapProps = ${stringify(data.baseMapProps)}`
      : ''}

    export default Icon
  `)
}

const baseDefaultProps = {
  defaultClassName: 'Icon',
  fill: 'currentColor',
}

const baseMapProps = {
  center: {
    style: {
      verticalAlign: 'middle',
      position: 'relative',
      top: 'calc(-1em * 1/6)',
    },
  },
  text: {size: '1.2em'},
}

const filenameTemplate = name => pascalCase(name).replace(/_/g, '')

const defaults = {
  template,
  baseTemplate,
  defaultProps: {},
  baseDefaultProps,
  baseMapProps,
  filenameTemplate,
  svgoPlugins: [],
}

module.exports = defaults
