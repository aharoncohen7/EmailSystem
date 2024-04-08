import React, { useState } from 'react'
import styles from './style.module.css'
import MsgLi from '../MsgLi';
import EmailTitle from '../EmailTitle';
import { setDateAndTime } from './../../helpers/index.js'

const EmailPage = () => {
  const [isExpand, setIsExpand] = useState(false);
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


  return (
    <div className={styles.main}>
      <>
        <EmailTitle date={setDateAndTime(item.email.lastDate)} subject={item.email.subject} />
        <div className={styles.list}>
          {item.email.msg.map((msg) => (
            <div key={msg._id} className={styles.msgLi}>
              <MsgLi msg={msg} thisUser={thisUser} isExpand={isExpand} setIsExpand={setIsExpand} /></div>
          ))}
        </div>
      </>
    </div>
  )
}

export default EmailPage