import React from 'react'

import { GoEye } from "react-icons/go";
import { IoMdContacts } from "react-icons/io";
import { VscGraph } from "react-icons/vsc";
import { IoVideocam } from "react-icons/io5";
import { MdAvTimer } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import styles from './style.module.css'

const mainNavIcons = [
    { icon: MdAvTimer, name: "Timer" },
    { icon: BsClipboardCheck, name: "Tasks" },
    { icon: GoEye, name: "Watch" },
    { icon: IoMdContacts, name: "Emails" },
    { icon: VscGraph, name: "Stats" },
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
