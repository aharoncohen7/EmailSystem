import styles from './style.module.css'
import { FaEnvelope } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


export default function NewMsgBtn() {
   return (
      <NavLink
         key='new-message'
         to='new-message'>

         <span className={styles.main}>
            <FaEnvelope />

            <span className={styles.text}>New message</span>
         </span>
      </NavLink>
   )
}
