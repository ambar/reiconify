const cosmiconfig = require('cosmiconfig')
const pascalCase = require('pascal-case')
const merge = require('lodash/merge')
const prettier = require('./prettier')
const pkg = require('../package.json')

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

    const Icon = ({
      name,
      className,
      defaultClassName,
      defaultCenterStyle,
      size,
      align,
      ...props
    }) => (
      <svg
        className={\`\${defaultClassName} \${defaultClassName}--\${name}\${className
          ? \` \${className}\`
          : ''}\`}
        {...props}
        {...size && {width: size, height: size}}
        style={{
          ...(align === 'center' ? defaultCenterStyle : {verticalAlign: align}),
          ...props.style,
        }}
      />
    )

    Icon.defaultProps = ${JSON.stringify(data.baseDefaultProps)}

    export default Icon
  `)
}

const baseDefaultProps = {
  defaultClassName: 'Icon',
  defaultCenterStyle: {
    verticalAlign: 'middle',
    position: 'relative',
    top: 'calc(-1em * 1/6)',
  },
  width: '1em',
  height: '1em',
  fill: 'currentColor',
}

const filenameTemplate = name => pascalCase(name).replace(/_/g, '')

const defaults = {
  template,
  baseTemplate,
  defaultProps: {},
  baseDefaultProps,
  filenameTemplate,
  svgoPlugins: [],
}

module.exports = async () => {
  const result = await cosmiconfig(pkg.name).load(process.cwd())
  return merge({}, defaults, result && result.config)
}
