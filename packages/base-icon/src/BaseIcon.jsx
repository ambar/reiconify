import React, {forwardRef} from 'react'

const ZWSP = '\u200b' // use zero-width space to mock [strut](https://www.w3.org/TR/CSS22/visudet.html#strut), &#8203;

const InlineCenter = ({children, disabled = false}) =>
  disabled ? (
    children
  ) : (
    <span style={{display: 'inline-flex', alignItems: 'center'}}>
      {ZWSP}
      {children}
    </span>
  )

const BaseIcon = forwardRef(
  (
    {
      size,
      as: As = 'svg',
      text = false,
      center = false,
      fill = 'currentColor',
      ...rest
    },
    ref
  ) => {
    if (text) {
      size = '1.2em'
    }

    return (
      <InlineCenter disabled={!center}>
        <As
          ref={ref}
          {...rest}
          {...(size && {width: size, height: size})}
          fill={fill}
        />
      </InlineCenter>
    )
  }
)

export default BaseIcon
