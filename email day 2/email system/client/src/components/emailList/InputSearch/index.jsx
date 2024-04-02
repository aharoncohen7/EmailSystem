import React from 'react'
import styles from './style.module.css'
import { FaSearch } from "react-icons/fa";

const InputSearch = () => {
    const [text, setText] = React.useState("");
    return (
        <div className={styles.main}>
            <input className={styles.input} type="text" placeholder='Search' onChange={(e) => setText(e.target.value)} maxLength={30}/>
            {!text && <FaSearch />}
        </div>
    )
}

export default InputSearch
