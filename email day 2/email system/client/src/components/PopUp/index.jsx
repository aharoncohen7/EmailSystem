import React, { useContext } from 'react'
import { PopupContext } from '../../App'
import styles from './style.module.css'
import { IoCloseCircle } from "react-icons/io5";




const PopUp = () => {
    const { content, setContent } = useContext(PopupContext)
    console.log(content);

    return (
        // מעטפת כללית כהה
        <div className={styles.blur} onClick={() => setContent(false)}>
            {/* חלון תוכן */}
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                {/* <span className={styles.colsePopup} > */}
                {/* כפתור סגירה */}
            
                    <IoCloseCircle className={styles.colse} onClick={() => setContent(false)}/>
            
                <span className={styles.content}>{content}   </span>
                {/* </span> */}
            </div>
        </div>
    )
}

export default PopUp