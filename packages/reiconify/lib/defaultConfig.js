const pascalCase = require('pascal-case')
const prettier = require('./prettier')

const template = data => {
  const jsxWithProps = data.jsxString
    .replace(/<svg([\s\S]*?)>/, (match, group) => `<Icon${group} {...props}>`)
    .replace(/<\/svg>$/, '</Icon>')

  return prettier(`
    import React from 'react'
    import Icon from './Icon'

    const ${data.name} = props => ${jsxWithProps}

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
  // serialize object, preserve function values
  // {foo: props => {}, bar: true} ➡ `{"foo": props => {}, "bar": true}`
  const serialize = obj =>
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
      ? `Icon.mapProps = ${serialize(data.baseMapProps)}`
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
      // move to the middle of cap, https://opentype.js.org/font-inspector.html
      //   (xHeight / 2 - capHeight / 2) / unitsPerEm ≈ .5em/2 - .7em/2
      // alternatives:
      //   - calc(0.5ex - var(--capHeight, .7em) / 2) ≈ calc(0.5ex - .35em)
      //   - var(--iconOffset, -.1em)
      top: '-.1em',
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
  camelCaseProps: true,
}

module.exports = defaults
