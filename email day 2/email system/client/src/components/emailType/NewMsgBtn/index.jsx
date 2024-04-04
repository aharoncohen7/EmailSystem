import styles from './style.module.css'
import { FaEnvelope } from "react-icons/fa";

export default function NewMsgBtn() {
   return (
      <p className={styles.main}>
        <FaEnvelope/>
        <span className={styles.text}>New message</span> 
      </p>
   )
}