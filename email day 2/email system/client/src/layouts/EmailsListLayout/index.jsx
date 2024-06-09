
import styles from './style.module.css'
import { Outlet} from 'react-router-dom'
import InputSearch from '../../components/emailList/InputSearch'
import EmailList from './../../components/emailList/EmailList'
import { useState } from 'react'

const EmailsListLayout = () => {
  const [isChangeList, setIsChangeList] = useState(true)
  return (
    <>
      <div className={styles.main}>
        <EmailList isChangeList={isChangeList} setIsChangeList={setIsChangeList}/>
      </div>
      < Outlet context={{isChangeList, setIsChangeList}}/>
    </>
  )
}

export default EmailsListLayout
