import React from 'react'
import {defaultTheme, Provider} from '@adobe/react-spectrum'
import {App, useTheme} from 'playland/theme'

const InnerProvider = ({children}) => {
  return (
    <Provider
      colorScheme={useTheme().colorMode}
      theme={defaultTheme}
      UNSAFE_style={{
        background: 'unset',
      }}
    >
      {children}
    </Provider>
  )
}

export default function ReiconifyApp(props) {
  return <App Provider={InnerProvider} {...props} />
}
