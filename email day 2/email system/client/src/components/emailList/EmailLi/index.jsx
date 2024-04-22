import React, { useState } from 'react'
import styles from './style.module.css'
import Badge from '../Badge'
import { BiSolidStar } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";
import { axiosReq, getDescriptionOrTime } from '../../../helpers';


const EmailLi = ({ item }) => {
  // console.log(item.chat.members[0].avatar ?? item.chat.members[0].avatar);
  const [isRead, setIsRead] = useState(item.isRead)
  // const { loading, data, error, fetchData } = useAxiosReq({ defaultVal: {}, method: 'PUT', url: `user-chats/${item._id}/isRead` })
  // const [isFavorite, setIsFavorite] = useState(item.isFavorite)

  const updateFields = ()=>{
    if(!item.isRead){
      axiosReq({  method: 'PUT', url: `user-chats/${item._id}/isRead` })
      setIsRead(true)
    }
  }

  // const updateFields = async () => {
  //   if(!item.isRead){
  //     try {
  //       const url = `http://localhost:4004/api/user-chats/${item._id}/isRead`;
  //       const response = await axios.put(url, {
  //       }, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           // 'authorization': localStorage.getItem('Authorization') || ''
  //         }
  //       });
  //       if (!response.data) {
  //         if (response.status === 401) {
  //           // Handle unauthorized access
  //         }
  //         throw new Error(`Network response was not ok! status: ${response.status}`);
  //       }
  //       // console.log(response.data);
  
  //       // if (field === "isFavorite") {
  //       //   setIsFavorite(prev => { return !prev })
  //       // }
  //       // if (field === "isRead") {
  //         setIsRead(prev => { return !prev })
  //       // }
  //     } catch (error) {
  //       console.error("Error fetching p:", error);
  //     }
  //   }
  // };


  // function handleIsRead(event){
  //   console.log(event.target);
  //   if (event.target.id === "chatLi"
  //   // &&(!item.isRead)
  // ) {
  //        updateFields('isRead')
  //   } 
  // }

  // function updateIsRead(event) {
    // if (!item.isRead) {
      // setIsRead(prev => { return !prev })
      // fetchData()
    // }
  // }


  // function updateIsFavorite(event) {
  //   if (event.currentTarget.id === "star") {
  //     updateFields('isFavorite')
  //     event.stopPropagation();
  //   }
  // }






  return (

    <div id="chatLi" className={styles.main} onClick={updateFields}>
      <img className={styles.avatar}
        src=
        {item?.chat?.members?.[0]?.avatar ? item.chat.members[0].avatar
          : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
        alt="" />
      <div className={styles.middle} >
        <h3>{item?.chat?.members?.[0]?.fullName ? item.chat.members[0].fullName.split(" ")[0] + "," : "Shlomo Levi"}</h3>
        <span className={styles.subject}>{item?.chat?.subject ? item?.chat?.subject : "hello jon.."}</span>
      </div>
      <div className={styles.information} >
        <span className={styles.time}>{item?.chat?.lastDate ? getDescriptionOrTime(item.chat.lastDate) : "00:00"}</span>
        {!isRead ? <FaEnvelope className={styles.envelope} /> : <BiSolidStar className={item.isFavorite ? styles.isFavorite : styles.notFavorite} />}


      </div>


    </div>
  )
}

export default EmailLi
