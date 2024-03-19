import React, {forwardRef} from 'react'
import * as svg from 'react-native-svg'

const BaseIcon = forwardRef(({size, ...rest}, ref) => {
  return (
    <svg.Svg ref={ref} {...rest} {...(size && {width: size, height: size})} />
  )
})

export default BaseIcon
