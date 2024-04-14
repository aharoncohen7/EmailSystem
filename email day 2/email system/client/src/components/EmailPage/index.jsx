import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './style.module.css'
import MsgLi from '../MsgLi';
import EmailTitle from '../EmailTitle';
import { formatDateTime } from './../../helpers/index.js'
import axios from 'axios';
import Editor from '../../pages/chat/Editor/index.jsx';

const EmailPage = ({ change }) => {
  const { chatId } = useParams()
  console.log(chatId);
  const [isExpand, setIsExpand] = useState(false);
  const [itemChat, setItemChat] = useState({});


  // יוזר לדוגמה
  const thisUser = {
    email: "user1@example.com",
    _id: "6617d4a80c4b7ac054155405",
    fullName: "Moshe Cohen",
    password: "123qwe",
    avatar: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Sunglasses&hairColor=Auburn&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Side&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Yellow",
  }

  // קבלת צ'אט
  useEffect(() => {
    const getChat = async () => {
      try {
        const url = `http://localhost:4004/api/chats/${chatId}`;
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            // 'authorization': localStorage.getItem('Authorization') || ''
          }
        });
        if (!response.data) {
          console.log();
          if (response.status === 401) {
            // Handle unauthorized access
          }
          throw new Error(`Network response was not ok! status: ${response.status}`);
        }
        console.log("this chat 😊🐱‍💻", response.data);
        setItemChat(response.data);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };
    getChat()
  }, [chatId, change]);

  return (
    <div className={styles.main}>
      <>
        <EmailTitle date={itemChat?.lastDate ? formatDateTime(itemChat.lastDate) : "00:00"} subject={itemChat.subject} />
        <div className={styles.list}>
          {itemChat.msg && itemChat.msg.map((msg) => (
            <div key={msg._id} className={styles.msgLi}>
              <MsgLi msg={msg} chatToShow={itemChat} thisUser={thisUser} isExpand={isExpand} setIsExpand={setIsExpand} />
            </div>
          ))}
        </div>
      </>
    </div>
  )
}

export default EmailPage