import React, { useState } from 'react'

import styles from './style.module.css'
import Editor from '../Editor'
import ChatHeader from '../../../components/ChatHeader'
import EmailPage from '../../../components/EmailPage'

const Chat = () => {
  const [change, setChange] = useState(false)
  const [resetKey, setResetKey] = useState(0);

  // יוזר לדוגמה
  const thisUser =
  {
    email: "user1@example.com",
    _id: "662ad1cb71375af1dc73fb45",
    fullName: "Moshe Cohen",
    password: "123qwe",
    avatar: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Sunglasses&hairColor=Auburn&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Side&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Yellow",
  }


  return (
    <div className={styles.main}>
      <ChatHeader />
      <span className={styles.chat} >
        <EmailPage thisUser={thisUser} change={change} /></span>
      <span className={styles.editorBox}>
        <Editor setChange={setChange} key={resetKey} setResetKey={setResetKey} />
      </span>
    </div>
  )
}

export default Chat
