import React from 'react'
import {Fabric} from 'office-ui-fabric-react/lib/Fabric'
import {initializeIcons} from '@uifabric/icons'
import styles from './app.module.css'

// 阻止 hot reload 重复初始化
if (!global.initialized) {
  global.initialized = true
  // Register icons and pull the fonts from the default SharePoint cdn.
  initializeIcons()
}

const pageRequire = require.context(
  '../docs/',
  true,
  process.env.REICONIFY_SHOW_ALIGN ? /\.mdx$/ : /^\.\/((?!Align).*)\.mdx/
)
const pages = pageRequire.keys()

const routes = pages.map(page => {
  const name = page.replace(/(^\.\/)|(\.mdx$)/g, '')
  const {default: Page} = pageRequire(page)

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

export default {routes}
