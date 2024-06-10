import React, { useContext, useEffect, useState } from 'react'
import  jsPDF  from "jspdf";
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
  console.log("🚀 ~ Chat ~ chatId:", chatId);
  // תוכן צ'אט
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // האם הצ'אט הזה מועדף
  const [isFavorite, setIsFavorite] = useState(false);
  //  משתנה בעת החלפה למצב מועדף/מחיקה/הוספה לשרשור
  // const { isChangeList, setIsChangeList } = useOutletContext();
  const { isChangeList, setIsChangeList } = useContext(ChatContext)

  // מאפס קומפוננט editor
  const [resetKey, setResetKey] = useState(0);

  // קבלת צ'אט
  useEffect(() => {
    const getChat = async () => {
      setLoading(true);
      const { chat, isFavorite, loading } = await axiosReq({ method: 'GET', url: `user-chats/${chatId}` })
      setData(chat);
      setIsFavorite(isFavorite);
      setLoading(loading);
    };
    getChat()
  }, [chatId, isChangeList]);


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
        setIsChangeList(prev => { return !prev })
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



  const printPDF = () => {
    const doc = new jsPDF();
  
    // doc.save(`m${chatId}.pdf`);
    // const doc = new jsPDF({
    //   orientation: "landscape",
    //   unit: "in",
    //   format: [4, 2]
    // });
    
    doc.text("Hello world!", 1, 1);
    doc.save("two-by-four.pdf");
    doc.text("Hello world!", 10, 10);
     // שמירת המסמך
     doc.save(`message${chatId}.pdf`);
  }




  return (
    <ChatContext.Provider value={{ chat: data, setIsFavorite, setIsChangeList, isFavorite }}>
      <div className={styles.main}>

        <>
          <ChatHeader printPDF={printPDF} />

          <span className={styles.chat} >
            <EmailPage loading={loading} />
          </span>
          <span className={styles.editorBox}>
            <Editor key={resetKey} setResetKey={setResetKey} onSend={addNewMessage} />
          </span>
        </>
      </div>
    </ChatContext.Provider>
  )
}

export default Chat
