import React from 'react'
import styles from './DebugGrid.module.css'

class DebugGrid extends React.Component {
  componentDidMount() {
    document.body.addEventListener('mousedown', this.show)
    document.body.addEventListener('dragstart', this.hide)
    document.body.addEventListener('mouseleave', this.hide)
    document.body.addEventListener('mouseup', this.hide)
  }

  componentWillUnmount = () => {
    document.body.removeEventListener('mousedown', this.show)
    document.body.removeEventListener('dragstart', this.hide)
    document.body.removeEventListener('mouseleave', this.hide)
    document.body.removeEventListener('mouseup', this.hide)
  }

  show = e => {
    const isAnchor = e && e.target.nodeName === 'A'
    if (!isAnchor) {
      document.body.classList.add(styles.blueprint)
    }
  }

  hide = () => {
    document.body.classList.remove(styles.blueprint)
  }

  render() {
    return null
  }
}

export default DebugGrid
