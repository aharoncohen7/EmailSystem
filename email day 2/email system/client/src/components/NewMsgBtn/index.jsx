import styles from './style.module.css'
import { BiEnvelope } from "react-icons/bi";

export default function NewMsgBtn() {
   return (
      <p className={styles.main}>
        <BiEnvelope/>
        <span className={styles.text}>New message</span> 
      </p>
   )
}