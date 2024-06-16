import React, { useContext } from 'react'
import styles from './style.module.css'
import { FaAngleLeft } from "react-icons/fa6";
import LabelBadge from '../LabelBadge';
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPrint } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { axiosReq } from '../../../helpers';
import { MdMarkAsUnread } from "react-icons/md";
import { ChatContext } from '../../../layouts/MainLayout';
import { PopupContext } from '../../../App';
import ExportToPdf from '../../../components/ExportToPDF';
import ConfirmPopUp from '../../../components/ConfirmPopUp';


const ChatHeader = ({ chat }) => {
  const { setPopUpContent } = useContext(PopupContext)
  const { setIsChangeList, isFavorite } = useContext(ChatContext)
  const { chatId } = useParams();
  const navTo = useNavigate()
  const location = useLocation();
  const path = decodeURIComponent(location.pathname.split("/")[2]);
  const deleteMsg = "Are you sure you want to delete this message?"
  


  // מחיקת שרשור
  const deleteChat = async () => {
    const results = await axiosReq({ method: 'PUT', url: `user-chats/${chatId}/isDeleted` })
    if (results._id) {
      setPopUpContent(<div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><h2 >נמחק בהצלחה</h2></div>)
      setIsChangeList(prev => { return !prev })
      navTo(`/chats/${path}`)
    }
  }

  // שינוי מצב מועדף
  const updateIsFavorite = async () => {
    const results = await axiosReq({ method: 'PUT', url: `user-chats/${chatId}/isFavorite` })
    if (results._id) {
      setIsChangeList(prev => { return !prev })
    }
  }

  // החזרה למצב לא נקרא
  const updateUnread = async () => {
    const results = await axiosReq({ method: 'PUT', url: `user-chats/${chatId}/isRead` })
    if (results._id) {
      setIsChangeList(prev => { return !prev })
      navTo(`/chats/${path}`)
    }
  }


  const savePDF = () => {








  }


  return (
    <div className={styles.main}>
      <span className={styles.libels} >
        <LabelBadge color={"rgb(234, 225, 133)"} />
      </span>
      <span className={styles.icons}>
        <FaStar onClick={updateIsFavorite} color={isFavorite ? "#00A389" : "#9b9b9b"} />
        <FaPrint onClick={() => setPopUpContent(<ExportToPdf chat={chat} />)} />
        <MdDelete onClick={() => setPopUpContent(<ConfirmPopUp setConfirm={deleteChat} msg={deleteMsg} />)} />
        <MdMarkAsUnread onClick={updateUnread} />
        <MdMoreVert />
      </span>

    </div>

  )
}

export default ChatHeader
