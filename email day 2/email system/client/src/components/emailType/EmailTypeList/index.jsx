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
    const [emailsUser, setEmailsUser] = useState([]);
// const [filteredData, setFilteredData] = useState([]);


const getInbox = async () => {
    try {
      const url = "http://localhost:4004/api/chat/";
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
      setEmailsUser(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };





useEffect(() => {
//   const getInbox = async () => {
//     try {
//       const url = "http://localhost:4004/api/chat/flags";
//       const response = await axios.get(url, {
//         headers: {
//           'Content-Type': 'application/json',
//           // 'authorization': localStorage.getItem('Authorization') || ''
//         },
//         body:{
//           flags:["notread", "inbox"]}
//       });
//       if (!response.data) {
//         if (response.status === 401) {
          
//         }
//         throw new Error(`Network response was not ok! status: ${response.status}`);
//       }
//       console.log(response.data);
//       setEmailsUser(response.data);

//       // console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

  
  getInbox();
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
                        {(obj.name=="Favorite" || obj.name=="Inbox") && <Badge>{emailsUser[obj.name2]}</Badge>}
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

