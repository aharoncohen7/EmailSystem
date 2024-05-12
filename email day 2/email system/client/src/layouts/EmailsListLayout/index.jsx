
import styles from './style.module.css'
import { Outlet , useOutletContext} from 'react-router-dom'
import InputSearch from '../../components/emailList/InputSearch'
import EmailList from './../../components/emailList/EmailList'
import { useState } from 'react'

const EmailsListLayout = () => {
  const [changeList, setChangeList] = useState(false)
  return (
    <>
      <div className={styles.main}>
        <EmailList changeList={changeList} setChangeList={setChangeList}/>
      </div>
      < Outlet context={{changeList, setChangeList}}/>
    </>
  )
}

export default EmailsListLayout
