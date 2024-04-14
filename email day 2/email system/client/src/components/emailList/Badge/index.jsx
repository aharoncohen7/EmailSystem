import styles from './style.module.css'

export default function Badge({ children, number }) {
   return (
      <p className={styles.main}>
         {children || number}
      </p>
   )
}