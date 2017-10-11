import React from 'react'
import cx from 'classnames'
import styles from './LineBox.css'

const LineBox = ({children, className, abs, ...props}) => (
  <div draggable className={cx(styles.lineBox, className)} {...props}>
    {abs ? (
      [
        <span key="content" className={styles.content}>
          &nbsp;
        </span>,
        <span key="abs" className={styles.abs}>
          {children}
        </span>,
      ]
    ) : (
      <span className={styles.content}>{children}</span>
    )}
    <span className={styles.top} />
    <span className={styles.textTop} />
    <span className={styles.cap} />
    <span className={styles.middle} />
    <span className={styles.baseline} />
    <span className={styles.textBottom} />
    <span className={styles.bottom} />
  </div>
)

export default LineBox
