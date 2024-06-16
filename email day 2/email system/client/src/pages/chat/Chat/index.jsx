import React, { useContext, useEffect, useState } from 'react'
import jsPDF from "jspdf";
import styles from './style.module.css'
import Editor from '../Editor'
import ChatHeader from '../../../pages/chat/ChatHeader'
import EmailPage from '../../../components/EmailPage'

import { useOutletContext, useParams } from 'react-router-dom'
import { axiosReq } from '../../../helpers'
import { ChatContext } from '../../../layouts/MainLayout';
import { UserContext } from '../../../layouts/MainLayout';

const Chat = () => {
  // מזהה צ'אט נוכחי
  const { chatId } = useParams()
  // console.log("🚀 ~ Chat ~ chatId:", chatId);
  // תוכן צ'אט
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);



  // האם הצ'אט הזה מועדף
  const [isFavorite, setIsFavorite] = useState(false);
  //  משתנה בעת החלפה למצב מועדף/מחיקה/הוספה לשרשור
  // const { isChangeList, setIsChangeList } = useOutletContext();
  const { isChangeList, setIsChangeList } = useContext(ChatContext)
  const { user, socket } = useContext(UserContext)

  // מאפס קומפוננט editor
  const [resetKey, setResetKey] = useState(0);

  // קבלת צ'אט
  useEffect(() => {
    const getChat = async () => {
      setLoading(true);
      const { chat, isFavorite, loading } = await axiosReq({ method: 'GET', url: `user-chats/${chatId}` })
      setData(chat);
      console.log(chat);
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
        console.log(result);
        resetEditor()
        socket.emit('message', {
          msg: "new message",
          senderId:  user._id,
          senderEmail:  user.email,
          receivers:  data.members,
          ref:  data._id,
          isNewChat: false
        })
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



  // const printPDF = () => {
  //   const doc = new jsPDF({
  //     orientation: "landscape",
  //     unit: "in",
  //     format: [4, 2]
  //   });
  //   doc.setFont('Helvetica', 'normal', 12); // Set font and line spacing
  //   // doc.autoSpacing(1.5);
  //   doc.text(20, 20, data.subject, { align: 'center', fontSize: 16 });

  //   // Print message text
  //   let yPosition = 40; // Starting position for message text
  //   const messageText = data.msg.reduce((text, message) => {
  //     text += message.content + '\n';
  //     return text;
  //   }, '');
  //   doc.text(20, yPosition, messageText);

  //   // output PDF
  //   doc.output(`chat-${chatId}.pdf`);


  //   // שמירת המסמך
  //   doc.save(`chat-${chatId}.pdf`);
  // }

  const printPDF = (data) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [4, 2]
    });
    // doc.setFont('Helvetica', 'normal', 12);

    // Check if data object exists and has properties
    if (data && data.subject && data.msg) {
      console.log("Data is valid: "); // Log data for debugging
      doc.text(20, 20, data.subject, { align: 'center', fontSize: 16 });

      // Print message text
      let yPosition = 40;
      const messageText = data.msg.reduce((text, message) => {
        text += message.content + '\n';
        return text;
      }, '');

      // Check if messageText has content
      if (messageText) {
        console.log("Message text:", messageText); // Log message text for debugging
        doc.text(20, yPosition, messageText);
      } else {
        console.error("No message content found!"); // Log error if empty
      }
    } else {
      console.error("Invalid data object!"); // Log error if data is missing
    }

    // Output PDF
    doc.output(`chat-${chatId}.pdf`);
    doc.save(`chat-${chatId}.pdf`);
  };

 

  return (
    <ChatContext.Provider value={{ chat: data, setIsFavorite, setIsChangeList, isFavorite }}>
      <div className={styles.main}>
        <ChatHeader chat={data}/>
        <span className={styles.chat} >
          <EmailPage loading={loading} />
        </span>
        <span className={styles.editorBox}>
          <Editor key={resetKey} setResetKey={setResetKey} onSend={addNewMessage} />
        </span>
      </div>
    </ChatContext.Provider>
  )
}

export default Chat
