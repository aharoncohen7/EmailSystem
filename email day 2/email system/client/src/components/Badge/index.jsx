import styles from './style.module.css'

export default function Badge({ children }) {
   return (
      <p className={styles.main}>
         {children}
      </p>
   )
}