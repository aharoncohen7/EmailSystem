import React, { useState } from 'react'

import styles from './style.module.css'
import Editor from '../Editor'
import ChatHeader from '../../../components/ChatHeader'
import EmailPage from '../../../components/EmailPage'

const Chat = () => {
  const [change, setChange] = useState(false)
  const [resetKey, setResetKey] = useState(0);


  return (
    <div className={styles.main}>
      <ChatHeader />
      <EmailPage change={change}/>
      <Editor setChange={setChange} key={resetKey} setResetKey={setResetKey}/>
    </div>
  )
}

export default Chat
