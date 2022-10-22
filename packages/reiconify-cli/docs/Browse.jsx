import React, {useState} from 'react'
import {
  SearchField,
  Switch,
  ActionButton,
  Tooltip,
  TooltipTrigger,
  Text,
} from '@adobe/react-spectrum'
import cx from 'classnames'
import Fuse from 'fuse.js'
import * as Icons from 'reiconify:icons'
import Batch from './components/Batch'
import LineBox from './components/LineBox'
import styles from './Browse.module.css'

const iconNames = Object.keys(Icons)
  // filter CJS `__esModule: true`
  .filter((k) => typeof Icons[k] === 'function')

const fuse = new Fuse(iconNames, {threshold: 0.3})
const getMatchNames = (keyword = '') => {
  const kw = keyword.trim()
  if (kw) {
    return fuse.search(kw).map((x) => x.item)
  }
  return iconNames
}

const Cell = ({name, isNameShown, Icon, color, large}) => {
  return (
    <div className={styles.cell}>
      <TooltipTrigger type="popover" delay={150}>
        <ActionButton
          isQuiet
          onPress={() => setIsOpen(!isOpen)}
          UNSAFE_style={{
            color,
            userSelect: 'unset!important',
          }}
        >
          <Icon
            center
            key={name}
            className={styles.icon}
            size={large ? '2em' : '1.2em'}
          />{' '}
          {isNameShown && <Text marginStart={4}>{name}</Text>}
        </ActionButton>
        <Tooltip variant="info" UNSAFE_className={styles.tooltip}>
          <LineBox
            style={{
              padding: '1rem .5rem',
              fontSize: '4em',
              color,
              whiteSpace: 'nowrap',
            }}
          >
            <Icon center size={large ? '2em' : '1.2em'} /> {name}
          </LineBox>
        </Tooltip>
      </TooltipTrigger>
    </div>
  )
}
const Browse = () => {
  const [keyword, setKeyword] = useState('')
  const [isNameShown, setIsNameShown] = useState(true)
  const [isColored, setIsColored] = useState(false)
  const [isLarger, setIsLarger] = useState(false)
  const color = isColored ? 'lightseagreen' : 'currentColor'

  return (
    <div className={styles.root}>
      <div className={styles.searchBox}>
        <SearchField
          // className={styles.searchInput}
          width="100%"
          type="text"
          value={keyword}
          placeholder="Search"
          onChange={(value) => setKeyword(value)}
        />
        <div
          className={styles.bar}
          //  onMouseDown={(e) => e.preventDefault()}
        >
          <Switch
            className={styles.toggle}
            isSelected={isNameShown}
            onChange={setIsNameShown}
          >
            name
          </Switch>
          <Switch
            className={styles.toggle}
            isSelected={isColored}
            onChange={setIsColored}
          >
            colorize
          </Switch>
          <Switch
            className={styles.toggle}
            isSelected={isLarger}
            onChange={setIsLarger}
          >
            larger
          </Switch>
        </div>
      </div>

      <div
        className={cx(styles.grid, {
          [styles.gridIsNameShown]: isNameShown,
        })}
        style={{color}}
      >
        <Batch
          items={getMatchNames(keyword).map((name) => (
            <Cell
              key={name}
              name={name}
              Icon={Icons[name]}
              color={color}
              large={isLarger}
              isNameShown={isNameShown}
            />
          ))}
        />
      </div>
    </div>
  )
}

export default Browse
