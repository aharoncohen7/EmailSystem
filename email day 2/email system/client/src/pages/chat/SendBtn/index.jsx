import styles from './style.module.css'
import { IoIosSend } from "react-icons/io";

export default function SendBtn({sendMessage}) {
   return (
      <p className={styles.main}>
        
        <span onClick={sendMessage} className={styles.text}>Send</span> 
        <IoIosSend />
      </p>
   )
}