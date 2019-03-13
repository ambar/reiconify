import React from 'react'
import {SearchBox} from 'office-ui-fabric-react/lib/SearchBox'
import {Toggle} from 'office-ui-fabric-react/lib/Toggle'
import {TooltipHost} from 'office-ui-fabric-react/lib/Tooltip'
import cx from 'classnames'
import * as Icons from '~icons'
import mm from 'micromatch'
import Batch from './Batch'
import LineBox from './LineBox'
import styles from './Browse.module.css'

const iconNames = Object.keys(Icons)
  // filter CJS `__esModule: true`
  .filter(k => typeof Icons[k] === 'function')
const getMatchNames = (keyword = '') => {
  const kw = keyword.trim()
  const glob = kw ? (/^\w+$/.test(kw) ? `*${kw}*` : kw) : '*'
  return mm(iconNames, glob, {nocase: true})
}

const Cell = ({name, Icon, color, large}) => (
  <div className={styles.cell} tabIndex={0}>
    <TooltipHost
      calloutProps={{gapSpace: 2, beakWidth: 10, className: styles.callout}}
      tooltipProps={{
        maxWidth: 600,
        onRenderContent: () => (
          <LineBox style={{padding: '2rem 1.5rem', fontSize: '4em', color}}>
            <Icon center size={large ? '2em' : '1.2em'} /> {name}
          </LineBox>
        ),
      }}
    >
      <Icon key={name} className={styles.icon} size={large ? '2em' : '1.2em'} />
    </TooltipHost>
    <span className={styles.name}>{name}</span>
  </div>
)

class Browse extends React.Component {
  state = {
    keyword: '',
    isNameShown: true,
    isColored: false,
    isLarger: false,
  }

  render() {
    const {keyword, isNameShown, isColored, isLarger, items} = this.state
    const color = isColored ? 'lightseagreen' : 'currentColor'

    return (
      <div>
        <div className={styles.searchBox}>
          <SearchBox
            className={styles.searchInput}
            type="text"
            value={keyword}
            placeholder="Search"
            onChange={value => this.setState({keyword: value})}
          />
          <div className={styles.bar} onMouseDown={e => e.preventDefault()}>
            <Toggle
              className={styles.toggle}
              label="name"
              checked={isNameShown}
              onChanged={() => this.setState({isNameShown: !isNameShown})}
            />
            <Toggle
              className={styles.toggle}
              label="colorize"
              checked={isColored}
              onChanged={() => this.setState({isColored: !isColored})}
            />
            <Toggle
              className={styles.toggle}
              label="larger"
              checked={isLarger}
              onChanged={() => this.setState({isLarger: !isLarger})}
            />
          </div>
        </div>

        <div
          className={cx(styles.grid, {
            [styles.isNameShown]: isNameShown,
          })}
          style={{color}}
        >
          <Batch
            items={getMatchNames(keyword).map(name => (
              <Cell
                key={name}
                name={name}
                Icon={Icons[name]}
                color={color}
                large={isLarger}
              />
            ))}
          />
        </div>
      </div>
    )
  }
}

export default Browse
