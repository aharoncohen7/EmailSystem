import React, { useContext, useState } from 'react'

import styles from './style.module.css'
import Editor from '../Editor'
import ChatHeader from '../../../components/ChatHeader'
import EmailPage from '../../../components/EmailPage'
import { UserContext } from '../../../App'

const Chat = () => {
  const [change, setChange] = useState(false)
  const [resetKey, setResetKey] = useState(0);
  const {user} = useContext(UserContext)



  return (
    <div className={styles.main}>
      <ChatHeader />
      <span className={styles.chat} >
        <EmailPage user={user} change={change} /></span>
      <span className={styles.editorBox}>
        <Editor setChange={setChange} key={resetKey} setResetKey={setResetKey} />
      </span>
    </div>
  )
}

export default Chat
