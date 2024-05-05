import React, { useContext } from 'react'
import styles from './style.module.css'
import { FaAngleLeft } from "react-icons/fa6";
import LabelBadge from '../../pages/chat/LabelBadge';
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPrint } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { ChatContext, PopupContext } from '../../App';
import DeleteMsg from '../DeleteMsg';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq } from '../../helpers';


const ChatHeader = ({isFavorite}) => {
  const { setPopUpContent } = useContext(PopupContext)
  const { chat,  setChangeList } = useContext(ChatContext)
  const { chatId } = useParams();
  console.log(isFavorite);
  const navTo = useNavigate()

  

  const deleteMessage =  async () => {
    const results = await axiosReq({ method: 'PUT', url: `user-chats/${chatId}/isDeleted` })
    if (results._id){
           setPopUpContent(<div style={{height: "100%", display:"flex", justifyContent: "center", alignItems: "center"}}><h2 >נמחק בהצלחה</h2></div>)
           setChangeList(prev=>{return !prev})
           navTo("/chats/inbox")
    }
  }

    const updateIsFavorite =  () => {
     axiosReq({ method: 'PUT', url: `user-chats/${chatId}/isFavorite` })
     setChangeList(prev=>{return !prev})
  }

  return (
    <div className={styles.main}>
      <span className={styles.libels} >
        <LabelBadge />
      </span>
      <span className={styles.icons}>
        <FaStar color={isFavorite ? "green" : "red"} onClick={updateIsFavorite}/>
        <FaPrint />
        <MdDelete onClick={() => setPopUpContent(<DeleteMsg setConfirm={deleteMessage}/>)} />
        <MdMoreVert />
      </span>

    </div>

  )
}

export default ChatHeader
