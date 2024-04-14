import React, { useState, useEffect } from 'react'
import styles from './style.module.css'
import { NavLink } from 'react-router-dom';
import { HiInboxArrowDown } from "react-icons/hi2";
import { FiSend } from "react-icons/fi";
import { TiStarFullOutline } from "react-icons/ti";
import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { TbAlertHexagon } from "react-icons/tb";
import axios from 'axios';
import Badge from '../../emailList/Badge';


const emailTypeIcons = [
    { icon: HiInboxArrowDown, name: "Inbox", name2: "inbox"  },
    { icon: FiSend, name: "Sent Emails",  name2: "send"},
    { icon: TiStarFullOutline, name: "Favorite",  name2: "favorite"},
    { icon: BsFillPencilFill, name: "Draft",  name2: "draft"},
    { icon: MdDelete, name: "deleted",  name2: "deleted"},
]





const EmailTypeList = () => {


    const [isHovering, setIsHovering] = useState(false);
    const [numNotRead, setNumNotRead] = useState([]);
// const [filteredData, setFilteredData] = useState([]);


const getNotRead = async () => {
    try {
      const url = "http://localhost:4004/api/user-chats/not-read";
      const response = await axios.get(url, {
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
      console.log(response.data);
      setNumNotRead(response.data);
    } catch (error) {
      console.error("Error fetching notRead:", error);
    }
  };





useEffect(() => {
  getNotRead();
}, []);



    return (
        <ul className={styles.ul}>

            {emailTypeIcons.map((obj) => (
                <NavLink
                    key={obj.name}
                    to={`${obj.name.toLowerCase()}`}
                    className={({ isActive }) =>
                        `${isActive ? styles.active : ""} ${styles.box}`
                    }
                >

                    <li className={styles.li} title={obj.name}>
                        <obj.icon className={styles.icon} />
                        <span className={styles.name}>{obj.name}</span>
                        {(numNotRead[obj.name2]>0&& (obj.name=="Favorite" || obj.name=="Inbox"))   ? <Badge number={numNotRead[obj.name2]}/> : null}
                    </li>

                </NavLink>
            ))}

            <span

                className={styles.more}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <li className={`${styles.li} ${styles.li2}`} title={"more"}>

                    <MdExpandMore className={styles.icon} />

                    <span >more</span>

                    {isHovering && <div className={styles.hiddenList}>

                        <NavLink
                            className={styles.hiddenItem}
                            to={"spam"}
                            title='spam'
                        ><TbAlertHexagon /><span>Spam</span></NavLink>

                    </div>}
                </li>

            </span>
        </ul>


    )
}


export default EmailTypeList

