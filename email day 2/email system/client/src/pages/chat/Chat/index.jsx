import React from 'react'

import styles from './style.module.css'
import Editor from '../Editor'
import SendBtn from '../SendBtn'
import ChatHeader from '../../../components/ChatHeader'
import EmailPage from '../../../components/EmailPage'

const Chat = () => {
  return (
    <div className={styles.main}>
      <ChatHeader />
      <EmailPage/>
      <Editor />
      {/* <SendBtn /> */}
    </div>
  )
}

export default Chat
