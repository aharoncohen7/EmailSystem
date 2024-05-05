
import styles from './style.module.css'
import { Outlet , useOutletContext} from 'react-router-dom'
import InputSearch from '../../components/emailList/InputSearch'
import EmailLIst from '../../components/emailList/EmailLIst'
import { useState } from 'react'

const EmailsListLayout = () => {
  const [changeList, setChangeList] = useState(false)
  return (
    <>
      <div className={styles.main}>
        <EmailLIst changeList={changeList}/>
      </div>
      < Outlet context={{changeList, setChangeList}}/>
    </>
  )
}

export default EmailsListLayout
