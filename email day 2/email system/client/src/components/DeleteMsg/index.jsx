
import styles from './style.module.css'
import React, { useContext } from 'react'
import { PopupContext } from '../../App'

const DeleteMsg = ({ setConfirm }) => {
    const { setPopUpContent } = useContext(PopupContext)

    return (
        <div className={styles.main}>


            <span className={styles.msg}>Are you sure you want to delete this message?</span>
            <div className={styles.buttons}>
                <button onClick={setConfirm} className={styles.button1}>Confirm</button>
                <button onClick={()=>setPopUpContent(null)} className={styles.button2}>Cancel</button>
            </div>


        </div>
    )
}

export default DeleteMsg
