import React from 'react'
import styles from './style.module.css'
import Editor from '../Editor'
import LabelBadge from '../LabelBadge'
import InputSearch from '../InputSearch'
import EmailType from '../EmailType'
import SendBtn from '../SendBtn'
import EmailLi from '../EmailLi'
import NewMsgBtn from '../NewMsgBtn'
import Badge from '../Badge'

import MainLayout from '../MainLayout'
import EmailsTypeLayout from '../EmailsTypeLayout'
import EmailsListLayout from '../EmailsListLayout'
import Chat from '../Chat'



const MainContainer = () => {
  return (
    <div className={styles.main}>
      <MainLayout />
      <EmailsTypeLayout />
      <EmailsListLayout />
      <Chat />
    </div>
  )
}

export default MainContainer
