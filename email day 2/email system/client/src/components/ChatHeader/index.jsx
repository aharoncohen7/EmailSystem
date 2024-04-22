import React, { useContext } from 'react'
import styles from './style.module.css'
import { FaAngleLeft } from "react-icons/fa6";
import LabelBadge from '../../pages/chat/LabelBadge';
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosPrint } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import { PopupContext } from '../../App';
import DeleteMsg from '../DeleteMsg';


const ChatHeader = () => {
  const { setIsPpoupOpen, content, setContent } = useContext(PopupContext)

  return (

    <div className={styles.main}>

      <span className={styles.libels} href=""><LabelBadge /></span>

    



      <span className={styles.icons}>
        <FaStar />
        <IoIosPrint />
        <MdDelete onClick={() => setContent(<DeleteMsg />)} />
        <MdMoreVert />
      </span>

    </div>

  )
}

export default ChatHeader
