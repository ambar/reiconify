const pascalCase = require('pascal-case')

const template = data => {
  const jsxWithProps = data.jsxString
    .replace(
      /<svg([\s\S]*?)>/,
      (match, group) =>
        `<Icon${group} {...props} ${
          data.baseClassName
            ? `className={'${data.baseClassName} ${data.baseClassName}--${
                data.name
              }' + (props.className ? \` \${props.className}\` : '')}`
            : ``
        }>`
    )
    .replace(/<\/svg>$/, '</Icon>')

  return `
    import React from 'react'
    import Icon from '${data.baseName}'

    const ${data.name} = props => ${jsxWithProps}

    ${
      data.defaultProps && Object.keys(data.defaultProps).length
        ? `${data.name}.defaultProps = ${JSON.stringify(data.defaultProps)}`
        : ''
    }

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
      const thisProp = o[k]
      delete o[k]
      if (thisProp) {
        const reducer = reducers[k]
        const value = typeof reducer === 'function' ? reducer(o) : reducer
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
        size,
        center,
        ...rest
      } = ${data.baseMapProps ? `reduceProps(props, Icon.mapProps)` : 'props'}

      const svg = (
        <svg
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

    ${
      data.baseMapProps ? `Icon.mapProps = ${serialize(data.baseMapProps)}` : ''
    }

    Icon.strutStyle = {
      display: 'inline-flex',
      alignItems: 'center',
    }

    export default Icon
  `
}

const baseDefaultProps = {
  fill: 'currentColor',
}

const baseMapProps = {
  text: {size: '1.2em'},
}

const filenameTemplate = name => pascalCase(name).replace(/_/g, '')

const defaults = {
  name: 'Icon',
  baseName: './Icon',
  baseClassName: '',
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
