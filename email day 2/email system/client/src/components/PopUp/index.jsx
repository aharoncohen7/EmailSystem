import React, { useContext } from 'react'
import { PopupContext } from '../../App'
import styles from './style.module.css'
import { IoCloseCircle } from "react-icons/io5";




const PopUp = () => {
    const { popUpContent, setPopUpContent } = useContext(PopupContext)
    console.log(popUpContent);

    return (
        // מעטפת כללית כהה
        <div className={styles.blur} onClick={() => setPopUpContent(false)}>
            {/* חלון תוכן */}
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <IoCloseCircle className={styles.close} onClick={() => setPopUpContent(null)} />
                <span className={styles.content}>{popUpContent}   </span>
            </div>
        </div>
    )
}

export default PopUp