import React from 'react'
import * as Icons from 'reiconify:icons'
import LineBox from './components/LineBox'
// import DebugGrid from './components/DebugGrid'
// import styles from './Align.module.css'

const size = '1.2em'
const iconKeys = Object.keys(Icons)
  // filter CJS `__esModule: true`
  .filter((k) => typeof Icons[k] === 'function')
const RandomIcon =
  Icons[iconKeys[Math.floor(Math.random() * iconKeys.length)]] || (() => '？')

export const CenterDemo = () => {
  return (
    <LineBox style={{margin: '.5em 0'}}>
      <RandomIcon size={size} center />
      东西南北 Stylex
    </LineBox>
  )
}

export const FlexContainerDemo = () => {
  return (
    <LineBox style={{margin: '.5em 0'}}>
      <RandomIcon size={size} center />
      东西南北 Stylex
    </LineBox>
  )
}

export const VerticalAlignMiddleDemo = () => {
  return (
    <LineBox style={{margin: '.5em 0'}}>
      <RandomIcon
        size={size}
        align="middle"
        style={{verticalAlign: 'middle'}}
      />
      <span style={{verticalAlign: 'middle'}}>东西南北 Stylex</span>
    </LineBox>
  )
}

/*
// top = (xHeight/2 - capHeight/2) / unitsPerEm ≈ .5em/2 - .7em/2
// query font metrics: https://opentype.js.org/font-inspector.html
*/
export const TopOffsetHackDemo = () => {
  return (
    <LineBox style={{margin: '.5em 0'}}>
      <RandomIcon
        size={size}
        align="middle"
        style={{verticalAlign: 'middle'}}
      />
      <span style={{verticalAlign: 'middle'}}>东西南北 Stylex</span>
    </LineBox>
  )
}

/*     <DebugGrid />
    <h2>Default Size</h2>
    <div className={styles.grid}>
      {Object.entries(Icons).map(
        ([name, Icon]) =>
          typeof Icon === 'function' && (
            <span key={name} className={styles.cell}>
              <Icon key={name} align="center" /> {name}
            </span>
          )
      )}
    </div>
 */
