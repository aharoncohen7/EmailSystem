import styles from './style.module.css'
import { IoMdAdd } from "react-icons/io";

export default function AddBtn({}) {
   return (
      <p className={styles.main}>
        <IoMdAdd />
        <span className={styles.text}>Add</span> 
      </p>
   )
}