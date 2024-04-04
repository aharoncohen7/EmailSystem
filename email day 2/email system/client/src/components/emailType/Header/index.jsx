import React from 'react'
import styles from './style.module.css'
import { FaAngleLeft } from "react-icons/fa6";
const Header = () => {
  return (
    
      <div className={styles.main}>
        <a className={styles.link} href=""><FaAngleLeft/></a>
        
        <span className={styles.text}>Mailbox</span> 
      </div>
    
  )
}

export default Header
