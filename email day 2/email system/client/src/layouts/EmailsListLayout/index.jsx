
import styles from './style.module.css'
import { Outlet } from 'react-router-dom'
import InputSearch from '../../components/emailList/InputSearch'
import EmailLi from '../../components/emailList/EmailLi'

const EmailsListLayout = () => {
  return (
    <>
      <div className={styles.main}>
        <h1>Emails List</h1>
        <InputSearch />
        <EmailLi />
      </div>
      < Outlet />
    </>
  )
}

export default EmailsListLayout
