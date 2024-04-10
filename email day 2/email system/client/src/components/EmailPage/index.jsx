import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './style.module.css'
import MsgLi from '../MsgLi';
import EmailTitle from '../EmailTitle';
import { formatDateTime } from './../../helpers/index.js'
import  axios from 'axios';

const EmailPage = () => {
  const { chatId } = useParams()
  console.log(chatId);
  const [isExpand, setIsExpand] = useState(false);
  const [itemChat, setItemChat] = useState({});

  const thisUser = { "userId": "602c49ceb02aca8db6f826d", "emailAddress": "user2@example.com" }

  const item =
  {
    "email": {
      "_id": "6602c49eeb02aca8db6f8282",
      "subject": "Meeting with new investors",
      "lastDate": "2024-03-21T10:24:00.000Z",
      "msg": [
        {
          "_id": "6602c49ceb02aca8db6f8274",
          "to": ["user1@example.com"],
          "from": "user2@example.com",
          "date": "2024-03-21T10:00:00.000Z",
          "content": "Hi, I have a new  ,meeting opportunity  ,meeting opportunity  ,meeting opportunity  ,meeting opportunity  ,meeting opportunity  and I don’t know how to use it",
          "subject": "Meeting with new investors",
          "__v": 0
        },
        {
          "_id": "6602c49deb02aca8db6f8276",
          "to": ["user2@example.com"],
          "from": "user1@example.com",
          "date": "2024-03-21T10:08:00.000Z",
          "content": "- Hi, I have a new meeting opportunity, and I don’t know how to use it",
          "subject": "Meeting with new investors",
          "__v": 0
        },
        {
          "_id": "6602c49deb02aca8db6f8278",
          "to": ["user1@example.com"],
          "from": "user2@example.com",
          "date": "2024-03-21T10:24:00.000Z",
          "content": "Walla Sababa !!",
          "subject": "Meeting with new investors",
          "__v": 0
        },
        {
          "_id": "6602c49deb02aca8db6f8276",
          "to": ["user2@example.com"],
          "from": "user1@example.com",
          "date": "2024-03-21T10:08:00.000Z",
          "content": "- Hi, I have a new meeting opportunity, and I don’t know how to use it",
          "subject": "Meeting with new investors",
          "__v": 0
        },
        {
          "_id": "6602c49deb02aca8db6f8278",
          "to": ["user1@example.com"],
          "from": "user2@example.com",
          "date": "2024-03-21T10:24:00.000Z",
          "content": "Walla Sababa !!",
          "subject": "Meeting with new investors",
          "__v": 0
        },
        {
          "_id": "6602c49deb02aca8db6f8276",
          "to": ["user2@example.com"],
          "from": "user1@example.com",
          "date": "2024-03-21T10:08:00.000Z",
          "content": "- Hi, I have a new meeting opportunity, and I don’t know how to use it",
          "subject": "Meeting with new investors",
          "__v": 0
        },
        {
          "_id": "6602c49deb02aca8db6f8278",
          "to": ["user1@example.com"],
          "from": "user2@example.com",
          "date": "2024-03-21T10:24:00.000Z",
          "content": "Walla Sababa !!",
          "subject": "Meeting with new investors",
          "__v": 0
        },
        {
          "_id": "6602c49deb02aca8db6f8276",
          "to": ["user2@example.com"],
          "from": "user1@example.com",
          "date": "2024-03-21T10:08:00.000Z",
          "content": "- Hi, I have a new meeting opportunity, and I don’t know how to use it",
          "subject": "Meeting with new investors",
          "__v": 0
        },
        {
          "_id": "6602c49deb02aca8db6f8278",
          "to": ["user1@example.com"],
          "from": "user2@example.com",
          "date": "2024-03-21T10:24:00.000Z",
          "content": "Walla Sababa !!",
          "subject": "Meeting with new investors",
          "__v": 0
        }
      ],
      "__v": 0
    },
    "isSent": true,
    "isRecieved": false,
    "isFavorite": true,
    "isDeleted": false,
    "isRead": true,
    "_id": "6602c49eeb02aca8db6f8287"
  }

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


  useEffect(() => {
    getChat()
  }, [chatId]);



  return (
    <div className={styles.main}>
      <>
        <EmailTitle date={itemChat?.lastDate ? formatDateTime(itemChat.lastDate) : "00:00"} subject={itemChat.subject} />
        <div className={styles.list}>
          {itemChat.msg && itemChat.msg.map((msg) => (
            <div key={msg._id} className={styles.msgLi}>
              <MsgLi msg={msg} thisUser={thisUser} isExpand={isExpand} setIsExpand={setIsExpand} />
              </div>
          ))}
        </div>
      </>
    </div>
  )
}

export default EmailPage