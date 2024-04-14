import React from 'react'


import { IoMdContacts } from "react-icons/io";
import { IoMdStats } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { MdAvTimer } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import styles from './style.module.css'

const mainNavIcons = [
    { icon: MdAvTimer, name: "Timer" },
    { icon: BsClipboardCheck, name: "Tasks" },
    { icon: FaRegEye, name: "Watch" },
    { icon: IoMdContacts, name: "Chats" },
    { icon: IoMdStats, name: "Stats" },
    { icon: IoVideocam, name: "Video" }
]

const MainNav = () => {
    return (
        <div className={styles.main}>
            <img src="./vite.svg" alt="img" />

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
            </ul>
            <img src="./vite.svg" alt="img" />
        </div>
    )
}

export default MainNav
