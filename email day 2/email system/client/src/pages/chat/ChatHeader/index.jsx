import React, { useContext } from 'react'
import styles from './style.module.css'
import { FaAngleLeft } from "react-icons/fa6";
import LabelBadge from '../LabelBadge';
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPrint } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";

import DeleteMsg from '../../../components/DeleteMsg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { axiosReq } from '../../../helpers';
import { MdMarkAsUnread } from "react-icons/md";
import { ChatContext } from '../../../layouts/MainLayout';
import { PopupContext } from '../../../App';


const ChatHeader = ({printPDF }) => {
  const { setPopUpContent } = useContext(PopupContext)
  const { setIsChangeList, isFavorite } = useContext(ChatContext)
  const { chatId } = useParams();
  const navTo = useNavigate()
  const location = useLocation();
  const path = decodeURIComponent(location.pathname.split("/")[2]);


  const deleteMessage = async () => {
    const results = await axiosReq({ method: 'PUT', url: `user-chats/${chatId}/isDeleted` })
    if (results._id) {
      setPopUpContent(<div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><h2 >נמחק בהצלחה</h2></div>)
      setIsChangeList(prev => { return !prev })
      navTo(`/chats/${path}`)
    }
  }

  const updateIsFavorite = async () => {
    const results = await axiosReq({ method: 'PUT', url: `user-chats/${chatId}/isFavorite` })
    if (results._id) {
    setIsChangeList(prev => { return !prev })
  }
  }


  const updateUnread = async () => {
    const results = await axiosReq({ method: 'PUT', url: `user-chats/${chatId}/isRead` })
    if (results._id) {
      setIsChangeList(prev => { return !prev })
      navTo(`/chats/${path}`)
    }
  }

  return (
    <div className={styles.main}>
      <span className={styles.libels} >
        <LabelBadge color={"rgb(234, 225, 133)"} />
      </span>
      <span className={styles.icons}>
        <FaStar onClick={updateIsFavorite} color={isFavorite ? "#00A389" : "#9b9b9b"} />
        <FaPrint onClick={printPDF}/>
        <MdDelete onClick={() => setPopUpContent(<DeleteMsg setConfirm={deleteMessage} />)} />
        < MdMarkAsUnread onClick={updateUnread} />
        <MdMoreVert />
      </span>

    </div>

  )
}

export default ChatHeader
