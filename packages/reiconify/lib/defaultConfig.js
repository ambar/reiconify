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
  return prettier(`
    import React from 'react'

    const Icon = (props) => {
      const {
        name,
        className,
        defaultClassName,
        size,
        ...rest
      } = ${data.baseMapProps
        ? `(${String(data.baseMapProps)})(props)`
        : 'props'}

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

    export default Icon
  `)
}

const baseDefaultProps = {
  defaultClassName: 'Icon',
  fill: 'currentColor',
}

const baseMapProps = `({center, text, ...props}) => {
  if (center) {
    props = {
      ...props,
      style: {
        ...props.style,
        verticalAlign: 'middle',
        position: 'relative',
        top: 'calc(-1em * 1/6)',
      },
    }
  }

  if (text) {
    props = {
      ...props,
      size: '1.2em',
    }
  }

  return props
}`

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
