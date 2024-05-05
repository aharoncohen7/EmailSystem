import React, { useContext, useEffect, useState } from 'react'
import styles from './style.module.css'
import Editor from '../Editor'
import ChatHeader from '../../../components/ChatHeader'
import EmailPage from '../../../components/EmailPage'
import { ChatContext, UserContext } from '../../../App'
import { useOutletContext, useParams } from 'react-router-dom'
import { axiosReq } from '../../../helpers'


const Chat = () => {
  const { chatId } = useParams()
  const [isFavorite, setIsFavorite] = useState(false)
  const [data, setData] = useState({});
  const [change, setChange] = useState(false)
  const [resetKey, setResetKey] = useState(0);
  const {setChangeList} = useOutletContext();


  useEffect(() => {
    const getChat = async () => {
      const { chat, isFavorite } = await axiosReq({ method: 'GET', url: `user-chats/${chatId}` })
      setData(chat)
      setIsFavorite(isFavorite);
    };
    getChat()
  }, [chatId, change]);
  

  return (
    <ChatContext.Provider value={{chat: data,  change, setChange, setChangeList, isFavorite }}>
      <div className={styles.main}>
        <ChatHeader isFavorite={isFavorite}/>
        <span className={styles.chat} >
          <EmailPage />
          </span>
        <span className={styles.editorBox}>
          <Editor setChange={setChange} key={resetKey} setResetKey={setResetKey} />
        </span>
      </div>
    </ChatContext.Provider>
  )
}

export default Chat
