import React from 'react'
import EmailType from '../emailType/EmailType'
import NewMsgBtn from '../emailType/NewMsgBtn'
import styles from './style.module.css'
import { Outlet } from 'react-router-dom'


const EmailsTypeLayout = () => {
  return (
    <>
      <div className={styles.main}>
        <h1>Emails Type</h1>
        <NewMsgBtn />
        <EmailType />
      </div>
      <Outlet />
    </>
  )
}

export default EmailsTypeLayout
