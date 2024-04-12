import React from 'react'
import styles from './style.module.css'
import Badge from '../Badge'
import { BiSolidStar } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";
import { getDescriptionOrTime } from '../../../helpers';
import axios from 'axios'

const EmailLi = ({ item, setChange}) => {
  console.log(item.chat.members[0].avatar ?? item.chat.members[0].avatar );


  const updateFields = async (field) => {
    try {
      const url = `http://localhost:4004/api/user-chats/${item._id}/${field}`;
      const response = await axios.put(url, {
        // flags: ["notread", `${filter}`]
      }, {
        headers: {
          'Content-Type': 'application/json',
          // 'authorization': localStorage.getItem('Authorization') || ''
        }
      });
      if (!response.data) {
        if (response.status === 401) {
          // Handle unauthorized access
        }
        throw new Error(`Network response was not ok! status: ${response.status}`);
      }
      // console.log(response.data);
      setChange(prev => { return !prev })
    } catch (error) {
      console.error("Error fetching p:", error);
    }
  };


function hendelOpenChat(event){
  event.stopPropagation();
  if(!item.isRead){
    updateFields('isRead')
  } 
}

function updateIsFavorite(event){
  event.stopPropagation();
  updateFields('isFavorite')
  
}





  return (

    <div className={styles.main} onClick={(e)=>hendelOpenChat(e)}> 
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
        {!item.isRead ? <FaEnvelope className={styles.envelope} /> : <BiSolidStar onClick={(e)=>updateIsFavorite(e)} className={item.isFavorite ? styles.isFavorite : styles.notFavorite} />}


      </div>


    </div>
  )
}

export default EmailLi
