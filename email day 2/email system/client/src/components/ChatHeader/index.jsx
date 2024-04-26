import React, { useContext } from 'react'
import styles from './style.module.css'
import { FaAngleLeft } from "react-icons/fa6";
import LabelBadge from '../../pages/chat/LabelBadge';
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPrint } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { PopupContext } from '../../App';
import DeleteMsg from '../DeleteMsg';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq } from '../../helpers';


const ChatHeader = ({setChange}) => {
  const { setPopUpContent } = useContext(PopupContext)
  const { chatId } = useParams();
  const navTo = useNavigate()

  const deleteMessage =  async () => {
    const results = await axiosReq({ method: 'PUT', url: `user-chats/${chatId}/isDeleted` })
    if (results._id){
           setPopUpContent(<h2>נמחק בהצלחה</h2>)
           navTo("/chats/inbox")
           
    }
  }

    const updateIsFavorite =  () => {
     axiosReq({ method: 'PUT', url: `user-chats/${chatId}/isFavorite` })
     setChange(prev=>{return !prev})
  }

  return (
    <div className={styles.main}>
      <span className={styles.libels} href="">
        <LabelBadge />
      </span>
      <span className={styles.icons}>
        <FaStar onClick={updateIsFavorite}/>
        <FaPrint />
        <MdDelete onClick={() => setPopUpContent(<DeleteMsg setConfirm={deleteMessage}/>)} />
        <MdMoreVert />
      </span>

    </div>

  )
}

export default ChatHeader
