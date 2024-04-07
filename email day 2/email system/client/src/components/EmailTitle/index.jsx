import React from 'react'
import styles from './style.module.css'

const EmailTitle = ({date, subject}) => {
    return (

        
        <div className={styles.main} >
            <span className={styles.time}>{date}</span>
            <h2 className={styles.title}>{subject}</h2>
        </div>
    )
}

export default EmailTitle
