
import styles from './style.module.css'
import React, {  useContext } from 'react'
import { PopupContext } from '../../App'

const ConfirmPopUp = ({ setConfirm, msg, children }) => {
    const { setPopUpContent } = useContext(PopupContext)

    return (
        <div className={styles.main}>
            <span className={styles.msg}>{msg}</span>
            {children}
            <div className={styles.buttons}>
                <button onClick={setConfirm} className={styles.button1}>Confirm</button>
                <button onClick={() => setPopUpContent(null)} className={styles.button2}>Cancel</button>
            </div>
        </div>
    )
}

export default ConfirmPopUp
