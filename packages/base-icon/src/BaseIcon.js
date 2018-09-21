import React from 'react'

// use zero-width space to mock [strut](https://www.w3.org/TR/CSS22/visudet.html#strut), &#8203;
const ZWSP = '\u200b'

const BaseIcon = props => {
  let {name, className, defaultClassName, size, text, center, ...rest} = props

  if (text) {
    size = '1.2em'
  }

  const svg = (
    <svg
      className={`${defaultClassName} ${defaultClassName}--${name}${
        className ? ` ${className}` : ''
      }`}
      {...rest}
      {...size && {width: size, height: size}}
    />
  )

  return center ? (
    <span style={BaseIcon.strutStyle}>
      {ZWSP}
      {svg}
    </span>
  ) : (
    svg
  )
}

BaseIcon.defaultProps = {
  defaultClassName: 'Icon',
  fill: 'currentColor',
}

BaseIcon.strutStyle = {
  display: 'inline-flex',
  alignItems: 'center',
}

export default BaseIcon
