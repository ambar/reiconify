import React from 'react'
import * as Icons from '~icons'
import LineBox from './LineBox'
// import DebugGrid from './components/DebugGrid'
// import styles from './Align.module.css'

const size = '1.2em'
const iconKeys = Object.keys(Icons)
  // filter CJS `__esModule: true`
  .filter(k => typeof Icons[k] === 'function')
const RandomIcon =
  Icons[iconKeys[Math.floor(Math.random() * iconKeys.length)]] || (() => '？')

export default () => (
  <div>
    <h2>Demos</h2>

    <h3>a: inline-flex wrapper and strut hack</h3>
    <LineBox>
      <RandomIcon size={size} center />
      东西南北 Stylex
    </LineBox>

    <h3>b: flex container</h3>
    <LineBox>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          verticalAlign: 'top',
        }}
      >
        <RandomIcon size={size} />
        东西南北 Stylex
      </div>
    </LineBox>

    <h3>c: vertical-align middle</h3>
    <LineBox>
      <RandomIcon
        size={size}
        align="middle"
        style={{verticalAlign: 'middle'}}
      />
      <span style={{verticalAlign: 'middle'}}>东西南北 Stylex</span>
    </LineBox>

    <h3>d: top offset hack</h3>
    <LineBox>
      <RandomIcon
        size={size}
        style={{verticalAlign: 'middle', position: 'relative', top: '-.1em'}}
      />
      东西南北 Stylex
    </LineBox>

    {/* <DebugGrid /> */}
    {/* <h2>Default Size</h2>
    <div className={styles.grid}>
      {Object.entries(Icons).map(
        ([name, Icon]) =>
          typeof Icon === 'function' && (
            <span key={name} className={styles.cell}>
              <Icon key={name} align="center" /> {name}
            </span>
          )
      )}
    </div> */}
  </div>
)
