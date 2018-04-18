import React from 'react'
import {Fabric} from 'office-ui-fabric-react/lib/Fabric'
import {initializeIcons} from '@uifabric/icons'
import styles from './app.css'

// 阻止 hot reload 重复初始化
if (!global.initialized) {
  global.initialized = true
  // Register icons and pull the fonts from the default SharePoint cdn.
  initializeIcons()
}

const routes = ['Browse', 'Align'].map(name => {
  const Page = require(`./${name}`).default

  return {
    name,
    path: `/${name}`,
    component: () => (
      <Fabric className={styles.fabric}>
        <Page />
      </Fabric>
    ),
  }
})

export const decorators = {}

export {routes}
