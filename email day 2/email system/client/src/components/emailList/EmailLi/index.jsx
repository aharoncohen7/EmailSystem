import React, { useContext, useState } from 'react'
import styles from './style.module.css'
import Badge from '../Badge'
import { BiSolidStar } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";
import { axiosReq, getDescriptionOrTime } from '../../../helpers';
import { ChatContext } from '../../../App';


const EmailLi = ({ item , setIsChangeList}) => {
  const updateIsRead = async () => {
    if (!item.isRead) {
      const results =  await axiosReq({ method: 'PUT', url: `user-chats/${item._id}/isRead` })
      if (results._id) {
      setIsChangeList(prev=>{return !prev})
    }
    }
  }

  return (
    <div id="chatLi" className={styles.main} onClick={updateIsRead}>
      <span className={styles.avatarContainer}>

        {item?.chat?.members && item.chat.members.map((member, index) => (
          <span className={styles.avatar} key={index} style={{zIndex:10-index, left: (index*4)+"px" }}>
            <img
            src={member.avatar ? member.avatar : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
            alt="avatar"
          />
            </span>
    
        ))}
      </span>
      <div className={styles.middle} >
        <h3>{item?.chat?.members?.[0]?.fullName ? item.chat.members[0].fullName.split(" ")[0] + "," : "Shlomo Levi"} + {item?.chat?.members.length - 1}</h3>
        <span className={styles.subject}>
          {item?.chat?.subject ?
            (item.chat.subject.length > 15 ?
              item.chat.subject.substring(0, 15) + "..." :
              item.chat.subject) :
            "hello jon.."}
        </span>
      </div>
      <div className={styles.information} >
        <span className={styles.time}>{item?.chat?.lastDate ? getDescriptionOrTime(item.chat.lastDate) : "00:00"}</span>
        {!item.isRead ? <FaEnvelope className={styles.envelope} /> : <BiSolidStar className={item.isFavorite ? styles.isFavorite : styles.notFavorite} />}
      </div>
    </div>
  )
}

export default EmailLi
