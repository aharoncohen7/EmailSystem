import styles from './style.module.css'
import { IoIosSend } from "react-icons/io";

export default function SendBtn({sendMessage}) {
   return (
      <p className={styles.main}>
         <IoIosSend size={"20px"}/>
        <span onClick={sendMessage} className={styles.text}>Send</span> 
       
      </p>
   )
}