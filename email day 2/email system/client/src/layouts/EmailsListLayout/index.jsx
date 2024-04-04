
import styles from './style.module.css'
import { Outlet } from 'react-router-dom'
import InputSearch from '../../components/emailList/InputSearch'
import EmailLIst from '../../components/emailList/EmailLIst'

const EmailsListLayout = () => {
  return (
    <>
      <div className={styles.main}>
        
        <EmailLIst />
      </div>
      < Outlet />
    </>
  )
}

export default EmailsListLayout
