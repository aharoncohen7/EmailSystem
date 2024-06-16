import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import { IoMdContacts } from "react-icons/io";
import { IoMdStats } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { MdAvTimer } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

import { UserContext } from '../../../layouts/MainLayout';
import styles from './style.module.css'
import Badge from '../../emailList/Badge';
import { PopupContext } from '../../../App';
import { axiosReq } from '../../../helpers';


const mainNavIcons = [
    { icon: MdAvTimer, name: "Timer" },
    { icon: BsClipboardCheck, name: "Tasks" },
    { icon: FaRegEye, name: "Watch" },
    { icon: IoMdContacts, name: "Chats" },
    { icon: IoMdStats, name: "Stats" },
    { icon: IoVideocam, name: "Video" }
]

const MainNav = () => {
    const { user, setUser } = useContext(UserContext)
    const { setPopUpContent } = useContext(PopupContext)
    const navTo = useNavigate();
    // console.log("🚀 ~ MainNav ~ user:", user)

    const logOut = () => {
        localStorage.removeItem("token")
        navTo("/login");
        // window.location.reload()
    }

    const readNotifications = () => {
        if (user.notifications?.length) {

            setPopUpContent(<>{user.notifications.map((notification) => {
                if (notification.msg === "new_message") {
                    return <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><h5 >{
                        `A new message has been received from ${notification.from}`}</h5>
                        <span>{ }</span>

                    </div>
                }

            })}</>)
            setTimeout(() => {
                axiosReq({ url: `users/delete-notifications/${user._id}`, method: 'PUT' });
                setUser(prev=>{
                    return {
                       ...prev,
                        notifications: []
                    }
                })
            }, 3000)
        }
    }



    return (
        <div className={styles.main}>
            <img src="https://res.cloudinary.com/dmenvz22i/image/upload/v1717927733/avatars/yxbzsgoil2por8mrnp8w.png" alt="logo" />

            <ul className={styles.ul}>
                {mainNavIcons.map((obj) => (
                    <NavLink
                        key={obj.name}
                        to={`/${obj.name.toLowerCase()}`}
                        className={({ isActive }) =>
                            `${isActive ? styles.active : ""} ${styles.box}`
                        }
                    >
                        <li className={styles.li} title={obj.name}>
                            <obj.icon className={styles.icon} />
                        </li>

                    </NavLink>
                ))}
                {
                    user.notifications &&
                    <span className={styles.bell} onClick={readNotifications}>
                        {
                            user.notifications.length ?
                                <span className={styles.sumNotifications}>{user.notifications.length}</span> : null
                        }
                        <span  className={user.notifications.length ? styles.notifications : " "}>
                            < IoIosNotifications size={26} />
                        </span>
                    </span>
                }
            </ul>

            <img className={styles.avatar}
            title={user.email}
                onClick={logOut}
                src={user.avatar}
                alt="avatar" />
        </div>
    )
}

export default MainNav
