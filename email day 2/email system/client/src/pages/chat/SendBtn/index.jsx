import styles from './style.module.css'
import { IoIosSend } from "react-icons/io";

export default function SendBtn() {
   return (
      <p className={styles.main}>
         <IoIosSend size={"20px"}/>
        <span 
    
        >Send</span> 
       
      </p>
   )
}