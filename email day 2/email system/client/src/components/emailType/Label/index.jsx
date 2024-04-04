import React from 'react'
import styles from './style.module.css'

const Label = ({color}) => {
  const myColor = color;
  return (
    <div className={styles.main} >
      <div style={{ backgroundColor: `${myColor}` }} className={styles.rectangle}>
      </div>
      <div style={{ backgroundColor: `${myColor}` }} className={styles.triangle}></div>
    </div>
  )
}

export default Label
