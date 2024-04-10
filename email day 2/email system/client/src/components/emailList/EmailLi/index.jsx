import React from 'react'
import styles from './style.module.css'
import Badge from '../Badge'
import { BiSolidStar } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";
import { getDescriptionOrTime } from '../../../helpers';

const EmailLi = ({ item }) => {
  // console.log(item.chat.members[0].avatar ?? item.chat.members[0].avatar );

  return (

    <div className={styles.main}>
      <img className={styles.avatar}
        src=
        {item?.chat?.members?.[0]?.avatar ? item.chat.members[0].avatar
          : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
        alt="" />
      <div className={styles.middle} >
        <h3>{item?.chat?.members?.[0]?.fullName ? item.chat.members[0].fullName.split(" ")[0] + "," : "Shlomo Levi"}</h3>
        <p className={styles.subject}>{item?.chat?.subject ? item?.chat?.subject : "hlloe jon.."}</p>
      </div>
      <div className={styles.information} >
        <p className={styles.time}>{item?.chat?.lastDate ? getDescriptionOrTime(item.chat.lastDate) : "00:00"}</p>
        {!item.isRead ? <FaEnvelope className={styles.envelope} /> : <BiSolidStar onClick={() => {

          item.isFavorite = !item.isFavorite;

        }} className={item.isFavorite ? styles.isFavorite : styles.notFavorite} />}


      </div>


    </div>
  )
}

export default EmailLi
