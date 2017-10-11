import React from 'react'
import {Markdown} from 'playland'
import * as Icons from '~icons'
import DebugGrid from './components/DebugGrid'
import LineBox from './components/LineBox'
import styles from './Align.css'

const size = '90'
const iconKeys = Object.keys(Icons)
  // filter CJS `__esModule: true`
  .filter(k => typeof Icons[k] === 'function')
const RandomIcon =
  Icons[iconKeys[Math.floor(Math.random() * iconKeys.length)]] || (() => '？')

export default () => (
  <div>
    <Markdown text={require('./HowToAlign.md')} />

    <h3>align=center</h3>
    <LineBox>
      <RandomIcon size={size} align="center" />
      ️️️东西南北 Styles
    </LineBox>

    <h3>flex center</h3>
    <LineBox abs>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RandomIcon size={size} />
        东西南北 Styles
      </div>
    </LineBox>

    <h3>vertical-align middle</h3>
    <LineBox>
      <RandomIcon size={size} align="middle" />
      <span style={{verticalAlign: 'middle'}}>东西南北 Styles</span>
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
