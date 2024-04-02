import React from 'react'

import styles from './style.module.css'
import Editor from '../Editor'
import LabelBadge from '../LabelBadge'
import SendBtn from '../SendBtn'

const Chat = () => {
  return (
    <div className={styles.main}>
      <LabelBadge />
      <Editor />
      <SendBtn />
    </div>
  )
}

export default Chat
