const {pascalCase} = require('pascal-case')

const template = (data) => {
  if (data.native) {
    const hasBaseName = !!data.baseName
    const tag = hasBaseName ? `SVGBase` : 'svg.Svg'
    return `
    import React from 'react'
    ${hasBaseName ? `import ${tag} from '${data.baseName}'` : ''}
    import * as svg from 'react-native-svg'
    export default function ${data.name}(props) {
      return ${data.jsxString
        .replace(
          /<svg\.Svg([\s\S]*?)>/,
          (match, group) => `<${tag}${group} {...props}>`
        )
        .replace(/<\/svg\.Svg>$/, `</${tag}>`)}
    }
`.trim()
  }
  const hasBaseName = !!data.baseName
  const tag = hasBaseName ? `SVG` : 'svg'
  const jsxWithProps = data.jsxString
    .replace(
      /<svg([\s\S]*?)>/,
      (match, group) =>
        `<${tag}${group} {...props} ${
          data.baseClassName
            ? `className={'${data.baseClassName} ${data.baseClassName}--${data.name}' + (props.className ? \` \${props.className}\` : '')}`
            : ``
        }>`
    )
    .replace(/<\/svg>$/, `</${tag}>`)

  return `
    import React from 'react'
    ${hasBaseName ? `import SVG from '${data.baseName}'` : ''}

    function ${data.name}(props) {
      return ${jsxWithProps}
    }

    ${
      data.defaultProps && Object.keys(data.defaultProps).length
        ? `${data.name}.defaultProps = ${JSON.stringify(data.defaultProps)}`
        : ''
    }

    export default ${data.name}
  `
}

const baseTemplate = (data) => {
  // serialize object, preserve function values
  // {foo: props => {}, bar: true} ➡ `{"foo": props => {}, "bar": true}`
  const serialize = (obj) =>
    JSON.stringify(obj, (k, v) =>
      typeof v === 'function' ? `λ${v}λ` : v
    ).replace(/("λ)((.|\n)*?)(λ")/g, '$2')

  return `
    import React from 'react'

    // use zero-width space to mock [strut](https://www.w3.org/TR/CSS22/visudet.html#strut), &#8203;
    const ZWSP = '\\u200b'

    const Icon = (props) => {
      let {size, text, center, ...rest} = props

      if (text) {
        size = '1.2em'
      }

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

const filenameTemplate = (name) => pascalCase(name).replace(/_/g, '')

const indexTemplate = (names) => {
  names = names.slice().sort()
  const lines = names.map(
    (name) => `export {default as ${name}} from './${name}'`
  )
  return lines.join('\n')
}

/**
 * @type {import('./types').Options}
 */
const defaults = {
  name: 'Icon',
  baseName: undefined,
  baseClassName: '',
  template,
  baseTemplate,
  defaultProps: {},
  baseDefaultProps,
  filenameTemplate,
  indexTemplate,
  svgoPlugins: [],
  camelCaseProps: true,
  native: false,
}

module.exports = defaults
