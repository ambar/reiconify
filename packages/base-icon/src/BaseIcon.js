import React from 'react'

const ZWSP = '\u200b' // use zero-width space to mock [strut](https://www.w3.org/TR/CSS22/visudet.html#strut), &#8203;

const withCenterProp = (
  strutStyle = {
    display: 'inline-flex',
    alignItems: 'center',
  }
) => Component => ({center, ...props}) =>
  center ? (
    <span style={strutStyle}>
      {ZWSP}
      <Component {...props} />
    </span>
  ) : (
    <Component {...props} />
  )

const withTextProp = (size = '1.2em') => Component => ({text, ...props}) => (
  <Component {...props} {...text && {size}} />
)

const withNameProp = (baseClassName = 'BaseIcon') => Component => ({
  name,
  className,
  ...props
}) => (
  <Component
    {...props}
    {...name && {
      className: `${baseClassName} ${baseClassName}--${name}${
        className ? ` ${className}` : ''
      }`,
    }}
  />
)

const BaseIcon = ({size, ...props}) => (
  <svg {...props} {...size && {width: size, height: size}} />
)

BaseIcon.defaultProps = {
  fill: 'currentColor',
}

export {withCenterProp, withTextProp, withNameProp}
export default withNameProp()(withTextProp()(withCenterProp()(BaseIcon)))
