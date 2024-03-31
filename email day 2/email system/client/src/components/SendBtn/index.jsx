import styles from './style.module.css'
import { IoIosSend } from "react-icons/io";

export default function SendBtn() {
   return (
      <p className={styles.main}>
        
        <span className={styles.text}>Send</span> 
        <IoIosSend />
      </p>
   )
}