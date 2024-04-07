
import styles from './style.module.css'
import React, { useContext } from 'react'
import { PopupContext } from '../../App'

const DeleteMsg = ({ setCancel, setConfirm }) => {
    const { content, setContent } = useContext(PopupContext)

    return (
        <div className={styles.main}>


            <span className={styles.msg}>Are you sure you want to delete this message?</span>
            <div className={styles.buttons}>
                <button onClick={setCancel} className={styles.button1}>Confirm</button>
                <button onClick={()=>setContent(null)} className={styles.button2}>Cancel</button>
            </div>


        </div>
    )
}

export default DeleteMsg
