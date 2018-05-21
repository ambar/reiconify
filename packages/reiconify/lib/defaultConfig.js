const pascalCase = require('pascal-case')

const template = data => {
  const jsxWithProps = data.jsxString
    .replace(/<svg([\s\S]*?)>/, (match, group) => `<Icon${group} {...props}>`)
    .replace(/<\/svg>$/, '</Icon>')

  return `
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
  `
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

  return `
    import React from 'react'

    // use zero-width space to mock [strut](https://www.w3.org/TR/CSS22/visudet.html#strut), &#8203;
    const ZWSP = '\\u200b'

    ${data.baseMapProps ? reduceProps : ''}

    const Icon = (props) => {
      const {
        name,
        className,
        defaultClassName,
        size,
        center,
        ...rest
      } = ${data.baseMapProps ? `reduceProps(props, Icon.mapProps)` : 'props'}

      const svg = (
        <svg
          className={\`\${defaultClassName} \${defaultClassName}--\${name}\${className
            ? \` \${className}\`
            : ''}\`}
          {...rest}
          {...size && {width: size, height: size}}
        />
      )

      return center ? (
        <span style={Icon.strutStyle}>
          {ZWSP}
          {svg}
        </span>
      ) : (
        svg
      )
    }

    Icon.defaultProps = ${JSON.stringify(data.baseDefaultProps)}

    ${data.baseMapProps
      ? `Icon.mapProps = ${serialize(data.baseMapProps)}`
      : ''}

    Icon.strutStyle = {
      display: 'inline-flex',
      alignItems: 'center',
    }

    export default Icon
  `
}

const baseDefaultProps = {
  defaultClassName: 'Icon',
  fill: 'currentColor',
}

const baseMapProps = {
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
