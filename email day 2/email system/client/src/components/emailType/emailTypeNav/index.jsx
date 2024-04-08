import React from 'react'
import styles from './style.module.css'
import EmailTypeList from '../EmailTypeList'
import NewMsgBtn from '../NewMsgBtn'
import Header from '../Header'
import LabelList from '../LabelList'


const EmailTypeNav = () => {

  
  return (
    <div className={styles.main}>
        <Header/>
        <NewMsgBtn />
        <EmailTypeList />
        <LabelList />
    </div>
  )
}

export default EmailTypeNav
