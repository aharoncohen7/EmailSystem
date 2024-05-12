import React, { useContext, useEffect, useState } from 'react'
import styles from './style.module.css'
import Editor from '../Editor'
import ChatHeader from '../../../pages/chat/ChatHeader'
import EmailPage from '../../../components/EmailPage'
import { ChatContext, UserContext } from '../../../App'
import { useOutletContext, useParams } from 'react-router-dom'
import { axiosReq } from '../../../helpers'


const Chat = () => {
  // מזהה צ'אט נוכחי
  const { chatId } = useParams()
  // תוכן צ'אט
  const [data, setData] = useState({});
  // האם הצ'אט הזה מועדף
  const [isFavorite, setIsFavorite] = useState(false);
  //  משתנה בעת החלפה למצב מועדף/מחיקה/הוספה לשרשור
  const { changeList, setChangeList } = useOutletContext();
  // מאפס קומפוננט editor
  const [resetKey, setResetKey] = useState(0);

// קבלת צ'אט
  useEffect(() => {
    const getChat = async () => {
      const { chat, isFavorite } = await axiosReq({ method: 'GET', url: `user-chats/${chatId}` })
      setData(chat);
      setIsFavorite(isFavorite);
    };
    getChat()
  }, [chatId, changeList]);


  // הוספת הודעה חדשה לצ'אט
  const addNewMessage = async (body) => {
    try {
      const result = await axiosReq({
        method: 'PUT',
        url: `chats/${chatId}`,
        body
      })
      if (result) {
        resetEditor()
        setChangeList(prev => { return !prev })
      }
      else {
        alert("Failed to send message")
      }

    } catch (e) {
      alert("Failed to send message")
      console.error(e)
    }
  }
  
   // Increment the key to force component remount
   const resetEditor = () => {
    setResetKey(prevKey => prevKey + 1);
  };




  return (
    <ChatContext.Provider value={{ chat: data, setIsFavorite, setChangeList, isFavorite }}>
      <div className={styles.main}>
        <ChatHeader />
        <span className={styles.chat} >
          <EmailPage />
        </span>
        <span className={styles.editorBox}>
          <Editor key={resetKey} setResetKey={setResetKey} onSend={addNewMessage} />
        </span>
      </div>
    </ChatContext.Provider>
  )
}

export default Chat
